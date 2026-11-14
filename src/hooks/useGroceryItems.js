import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function friendlyError(err) {
  if (!err) return 'Something went wrong.'
  if (err.code === '23505') return 'This item already exists.'
  if (err.code === '23514') return 'Invalid value — check the quantity.'
  if (err.code === '42501' || err.code === '42000') return 'Permission denied.'
  return 'Something went wrong. Please try again.'
}

function lowStockMessage(item) {
  const ratio = item.max_quantity > 0 ? item.quantity / item.max_quantity : 0
  if (item.quantity === 0) return `${item.emoji ?? ''} ${item.name} is out of stock!`
  if (ratio <= 0.25)
    return `${item.emoji ?? ''} ${item.name} is running low (${item.quantity} ${item.unit} left)`
  return null
}

export function useGroceryItems(householdId, role) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!householdId) return

    supabase
      .from('grocery_items')
      .select('*')
      .eq('household_id', householdId)
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setItems(data ?? [])
        setLoading(false)
      })

    const channel = supabase
      .channel(`grocery_items:${householdId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'grocery_items',
          filter: `household_id=eq.${householdId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setItems((prev) => [...prev, payload.new].sort((a, b) => a.name.localeCompare(b.name)))
          } else if (payload.eventType === 'UPDATE') {
            setItems((prev) => prev.map((i) => (i.id === payload.new.id ? payload.new : i)))
            if (role === 'dad' && Notification.permission === 'granted') {
              const body = lowStockMessage(payload.new)
              if (body && 'serviceWorker' in navigator)
                navigator.serviceWorker.ready
                  .then((reg) => reg.showNotification('Rasoi Alert', { body, icon: '/icons/icon-192.png' }))
                  .catch(() => {})
            }
          } else if (payload.eventType === 'DELETE') {
            setItems((prev) => prev.filter((i) => i.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [householdId])

  async function addItem(item) {
    const { error } = await supabase.from('grocery_items').insert({ ...item, household_id: householdId })
    if (error) throw new Error(friendlyError(error))
  }

  async function updateQuantity(id, quantity) {
    const { error } = await supabase.from('grocery_items').update({ quantity }).eq('id', id)
    if (error) throw new Error(friendlyError(error))
    // Edge function pushes "out of stock" alerts to shoppers' devices
    if (quantity === 0)
      supabase.functions.invoke('send-push', { body: { itemId: id } }).catch(() => {})
  }

  async function updateNote(id, note) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, note } : i)))
    const { error } = await supabase.from('grocery_items').update({ note }).eq('id', id)
    if (error) throw new Error(friendlyError(error))
  }

  async function deleteItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
    const { error } = await supabase.from('grocery_items').delete().eq('id', id)
    if (error) throw new Error(friendlyError(error))
  }

  return { items, loading, error, addItem, updateQuantity, updateNote, deleteItem }
}
