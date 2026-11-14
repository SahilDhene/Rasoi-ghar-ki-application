import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { stockStatus } from '../lib/stock'
import { createLatestWriter } from '../lib/latestWriter'

function friendlyError(err) {
  if (!err) return 'Something went wrong.'
  if (err.code === '23505') return 'This item already exists.'
  if (err.code === '23514') return 'Invalid value — check the quantity or category.'
  if (err.code === '42501' || err.code === '42000') return 'Permission denied.'
  return 'Could not save — check your internet and try again.'
}

const byName = (a, b) => a.name.localeCompare(b.name)

export function useGroceryItems(householdId, role) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // latest values for the realtime callback without re-subscribing
  const itemsRef = useRef(items)
  itemsRef.current = items
  const roleRef = useRef(role)
  roleRef.current = role
  // quantity saves: one in flight per item, latest value wins (see latestWriter.js)
  const rollbackTo = useRef(new Map())
  const quantityWriter = useRef(null)
  quantityWriter.current ??= createLatestWriter(
    async (id, quantity) => {
      const { error } = await supabase.from('grocery_items').update({ quantity }).eq('id', id)
      if (error) throw error
    },
    (id, quantity) => {
      rollbackTo.current.delete(id)
      // Edge function pushes "out of stock" alerts to shoppers' devices
      if (quantity === 0) supabase.functions.invoke('send-push', { body: { itemId: id } }).catch(() => {})
    },
  )

  useEffect(() => {
    if (!householdId) return
    let cancelled = false

    // Subscribe before the first fetch so no change slips through in between.
    const channel = supabase
      .channel(`grocery_items:${householdId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'grocery_items', filter: `household_id=eq.${householdId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const row = payload.new
            // may already be here from our own optimistic add
            setItems((prev) => (prev.some((i) => i.id === row.id) ? prev : [...prev, row].sort(byName)))
          } else if (payload.eventType === 'UPDATE') {
            const row = payload.new
            const old = itemsRef.current.find((i) => i.id === row.id)
            // while our own save is still running, the screen already shows the newer value
            if (quantityWriter.current.isBusy(row.id)) return
            setItems((prev) => prev.map((i) => (i.id === row.id ? row : i)))
            notifyIfJustRanLow(old, row)
          } else if (payload.eventType === 'DELETE') {
            setItems((prev) => prev.filter((i) => i.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    supabase
      .from('grocery_items')
      .select('*')
      .eq('household_id', householdId)
      .order('name')
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setError(error.message)
        else setItems(data ?? [])
        setLoading(false)
      })

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [householdId])

  // Local alert for shoppers, only when an item *crosses* into "low".
  // "Out of stock" is already pushed by the send-push edge function, so it's skipped here.
  function notifyIfJustRanLow(old, row) {
    if (roleRef.current !== 'dad' || !('Notification' in window) || Notification.permission !== 'granted') return
    if (stockStatus(row.quantity, row.max_quantity) !== 'low') return
    if (old && stockStatus(old.quantity, old.max_quantity) !== 'stocked') return
    navigator.serviceWorker?.ready
      .then((reg) =>
        reg.showNotification('Rasoi Alert', {
          body: `${row.emoji ?? ''} ${row.name} is running low (${row.quantity} ${row.unit} left)`,
          icon: '/icons/icon-192.png',
          tag: `low-${row.id}`, // replaces instead of stacking
        }),
      )
      .catch(() => {})
  }

  const patch = (id, fields) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...fields } : i)))

  async function addItem(item) {
    const { data, error } = await supabase
      .from('grocery_items')
      .insert({ ...item, household_id: householdId })
      .select()
      .single()
    if (error) throw new Error(friendlyError(error))
    setItems((prev) => (prev.some((i) => i.id === data.id) ? prev : [...prev, data].sort(byName)))
  }

  // Optimistic: the screen updates instantly, and rolls back if the save fails.
  async function updateQuantity(id, quantity) {
    // remember the value from before this burst of taps, in case the save fails
    if (!rollbackTo.current.has(id)) {
      const before = itemsRef.current.find((i) => i.id === id)
      if (before) rollbackTo.current.set(id, before.quantity)
    }
    patch(id, { quantity })
    try {
      await quantityWriter.current.write(id, quantity)
    } catch (error) {
      if (rollbackTo.current.has(id)) patch(id, { quantity: rollbackTo.current.get(id) })
      rollbackTo.current.delete(id)
      throw new Error(friendlyError(error))
    }
  }

  async function updateNote(id, note) {
    const before = itemsRef.current.find((i) => i.id === id)
    patch(id, { note })
    const { error } = await supabase.from('grocery_items').update({ note }).eq('id', id)
    if (error) {
      if (before) patch(id, { note: before.note })
      throw new Error(friendlyError(error))
    }
  }

  async function deleteItem(id) {
    const before = itemsRef.current.find((i) => i.id === id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    const { error } = await supabase.from('grocery_items').delete().eq('id', id)
    if (error) {
      if (before) setItems((prev) => [...prev, before].sort(byName))
      throw new Error(friendlyError(error))
    }
  }

  return { items, loading, error, addItem, updateQuantity, updateNote, deleteItem }
}
