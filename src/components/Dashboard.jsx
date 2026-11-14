import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n'
import { useGroceryItems } from '../hooks/useGroceryItems'
import LowStockAlert from './LowStockAlert'
import FilterBar from './FilterBar'
import SortToggle from './SortToggle'
import ItemCard from './ItemCard'
import AddItemModal from './AddItemModal'
import ShoppingMode from './ShoppingMode'
import { CartIcon, PlusIcon } from './Icons'
import s from './Dashboard.module.css'

// 0 = empty, 1 = low (≤25%), 2 = stocked — used to sort most-urgent first
function urgency(quantity, max) {
  if (quantity === 0) return 0
  return quantity / max <= 0.25 ? 1 : 2
}

export default function Dashboard({ role, householdId }) {
  const { t } = useLang()
  const { items, loading, error, addItem, updateQuantity, updateNote, deleteItem } = useGroceryItems(householdId, role)
  const [filter, setFilter] = useState('all')
  const [sortMode, setSortMode] = useState('status')
  const [showAdd, setShowAdd] = useState(false)
  const [showShopping, setShowShopping] = useState(false)

  const needToBuy = useMemo(
    () => items.filter((i) => i.quantity === 0 || i.quantity / i.max_quantity <= 0.25),
    [items],
  )

  const visible = useMemo(() => {
    let list = [...items]
    if (filter === 'empty') list = list.filter((i) => i.quantity === 0)
    else if (filter === 'low') list = list.filter((i) => i.quantity > 0 && i.quantity / i.max_quantity <= 0.25)
    else if (filter === 'stocked') list = list.filter((i) => i.quantity / i.max_quantity > 0.25)

    if (sortMode === 'status')
      list.sort((a, b) => urgency(a.quantity, a.max_quantity) - urgency(b.quantity, b.max_quantity))
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
          {visible.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              role={role}
              onUpdateQuantity={updateQuantity}
              onUpdateNote={updateNote}
              onDelete={deleteItem}
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

      {showAdd && <AddItemModal onAdd={addItem} onClose={() => setShowAdd(false)} />}
      {showShopping && (
        <ShoppingMode items={needToBuy} onUpdateQuantity={updateQuantity} onClose={() => setShowShopping(false)} />
      )}
    </div>
  )
}
