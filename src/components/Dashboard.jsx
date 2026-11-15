import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../lib/i18n'
import { useGroceryItems } from '../hooks/useGroceryItems'
import { STATUS_RANK, stockStatus } from '../lib/stock'
import LowStockAlert from './LowStockAlert'
import FilterBar from './FilterBar'
import SortToggle from './SortToggle'
import ItemCard from './ItemCard'
import AddItemModal from './AddItemModal'
import ShoppingMode from './ShoppingMode'
import { CartIcon, PlusIcon } from './Icons'
import s from './Dashboard.module.css'

const status = (i) => stockStatus(i.quantity, i.max_quantity)

export default function Dashboard({ role, householdId }) {
  const { t } = useLang()
  const { items, loading, error, addItem, updateQuantity, updateNote, deleteItem } = useGroceryItems(householdId, role)
  const [filter, setFilter] = useState('all')
  const [sortMode, setSortMode] = useState('status')
  const [showAdd, setShowAdd] = useState(false)
  const [showShopping, setShowShopping] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  // Failed saves were silent before (the change just vanished); now they show a toast.
  // rethrow=true for callers that need to know it failed (shopping mode keeps its sheet open).
  const reportErrors =
    (fn, rethrow = false) =>
    async (...args) => {
      try {
        return await fn(...args)
      } catch (e) {
        setToast(e.message)
        if (rethrow) throw e
      }
    }

  // Delete with undo: one tap hides the item; the real delete is sent after 5 s unless undone.
  // It's also sent right away if the app goes to the background or another item is deleted.
  const [pendingDelete, setPendingDelete] = useState(null)
  const deleteRef = useRef(deleteItem)
  deleteRef.current = deleteItem
  const pendingRef = useRef(null)
  pendingRef.current = pendingDelete

  const commitDelete = (item) => deleteRef.current(item.id).catch((e) => setToast(e.message))

  function requestDelete(item) {
    if (pendingRef.current) commitDelete(pendingRef.current)
    setPendingDelete(item)
  }

  useEffect(() => {
    if (!pendingDelete) return
    const flush = () => {
      commitDelete(pendingDelete)
      setPendingDelete(null)
    }
    const timer = setTimeout(flush, 5000)
    const onHide = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onHide)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [pendingDelete])

  // leaving the dashboard (e.g. sign out) still completes a pending delete
  useEffect(() => () => pendingRef.current && commitDelete(pendingRef.current), [])

  const liveItems = useMemo(
    () => (pendingDelete ? items.filter((i) => i.id !== pendingDelete.id) : items),
    [items, pendingDelete],
  )

  const needToBuy = useMemo(() => liveItems.filter((i) => status(i) !== 'stocked'), [liveItems])

  const visible = useMemo(() => {
    const list = filter === 'all' ? [...liveItems] : liveItems.filter((i) => status(i) === filter)
    if (sortMode === 'status') list.sort((a, b) => STATUS_RANK[status(a)] - STATUS_RANK[status(b)])
    else list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    return list
  }, [liveItems, filter, sortMode])

  if (loading)
    return (
      <div className="spinnerWrap">
        <div className="spinnerRing" />
      </div>
    )
  if (error) return <p className={s.errorMsg}>Error: {error}</p>

  return (
    <div className={s.page}>
      <LowStockAlert items={needToBuy} />

      <div className={s.toolbar}>
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        <SortToggle sortMode={sortMode} onSortChange={setSortMode} />
      </div>

      {visible.length === 0 ? (
        <div className={s.emptyState}>
          <p className={s.emptyTitle}>{liveItems.length === 0 ? t('no_items_yet') : t('no_items_filter')}</p>
          {liveItems.length === 0 && role === 'mom' && <p className={s.emptySub}>{t('no_items_sub')}</p>}
        </div>
      ) : (
        <div className={s.grid}>
          {visible.map((item, i) => (
            <ItemCard
              key={item.id}
              item={item}
              index={i}
              role={role}
              onUpdateQuantity={reportErrors(updateQuantity)}
              onUpdateNote={reportErrors(updateNote)}
              onDelete={requestDelete}
            />
          ))}
        </div>
      )}

      {role === 'mom' && (
        <button className={s.fab} onClick={() => setShowAdd(true)} aria-label={t('add_item')}>
          <PlusIcon size={22} />
        </button>
      )}
      {role === 'dad' && (
        <button className={`${s.fab} ${s.fabCart}`} onClick={() => setShowShopping(true)} aria-label={t('go_shopping')}>
          <CartIcon size={22} />
        </button>
      )}

      {showAdd && (
        <AddItemModal onAdd={addItem} onClose={() => setShowAdd(false)} existingNames={items.map((i) => i.name)} />
      )}
      {showShopping && (
        <ShoppingMode
          items={needToBuy}
          onUpdateQuantity={reportErrors(updateQuantity, true)}
          onClose={() => setShowShopping(false)}
        />
      )}

      <div className={s.toastStack}>
        {toast && (
          <div className={s.toast} role="alert">
            {toast}
          </div>
        )}
        {pendingDelete && (
          <div key={pendingDelete.id} className={`${s.toast} ${s.undoToast}`} role="status">
            <span>{t('item_deleted', { name: pendingDelete.name })}</span>
            <button className={s.undoBtn} onClick={() => setPendingDelete(null)}>
              {t('undo')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
