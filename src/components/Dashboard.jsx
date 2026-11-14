import { useEffect, useMemo, useState } from 'react'
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

  const needToBuy = useMemo(() => items.filter((i) => status(i) !== 'stocked'), [items])

  const visible = useMemo(() => {
    const list = filter === 'all' ? [...items] : items.filter((i) => status(i) === filter)
    if (sortMode === 'status') list.sort((a, b) => STATUS_RANK[status(a)] - STATUS_RANK[status(b)])
    else list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    return list
  }, [items, filter, sortMode])

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
          <p className={s.emptyTitle}>{items.length === 0 ? t('no_items_yet') : t('no_items_filter')}</p>
          {items.length === 0 && role === 'mom' && <p className={s.emptySub}>{t('no_items_sub')}</p>}
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
              onDelete={reportErrors(deleteItem)}
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

      {toast && (
        <div className={s.toast} role="alert">
          {toast}
        </div>
      )}
    </div>
  )
}
