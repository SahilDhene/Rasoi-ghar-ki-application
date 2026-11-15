import { useState } from 'react'
import { useLang } from '../lib/i18n'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { CheckCircleIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons'
import Emoji from './Emoji'
import s from './ShoppingMode.module.css'

// Bottom sheet for the shopper: set how much of each low item was bought, then restock in one go.
export default function ShoppingMode({ items, onUpdateQuantity, onClose }) {
  const { t } = useLang()
  // default "bought" amount = whatever fills the item back to max
  const [bought, setBought] = useState(() =>
    Object.fromEntries(items.map((i) => [i.id, i.max_quantity - i.quantity])),
  )
  const [saving, setSaving] = useState(false)
  useLockBodyScroll()
  const [done, setDone] = useState(false)

  function step(id, delta, max) {
    setBought((b) => ({ ...b, [id]: Math.min(Math.max((b[id] ?? 0) + delta, 0), max) }))
  }

  const anyBought = items.some((i) => (bought[i.id] ?? 0) > 0)

  async function updateStock() {
    if (!anyBought) return
    setSaving(true)
    try {
      await Promise.all(
        items
          .filter((i) => (bought[i.id] ?? 0) > 0)
          .map((i) => onUpdateQuantity(i.id, Math.min(i.quantity + bought[i.id], i.max_quantity))),
      )
      setDone(true)
      setTimeout(onClose, 1400)
    } catch {
      setSaving(false)
    }
  }

  return (
    <div className={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.sheet}>
        <div className={s.handle} />
        <div className={s.header}>
          <h2 className={s.title}>{t('shopping_mode')}</h2>
          <button className={s.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon size={17} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={s.empty}>
            <CheckCircleIcon size={40} className={s.emptyIcon} />
            <p className={s.emptyText}>{t('all_stocked')}</p>
          </div>
        ) : (
          <>
            <p className={s.sub}>{t('shopping_sub')}</p>
            <div className={s.list}>
              {items.map((item) => {
                const need = item.max_quantity - item.quantity
                const val = bought[item.id] ?? 0
                return (
                  <div key={item.id} className={s.row}>
                    <div className={s.itemEmoji}><Emoji char={item.emoji || '🛒'} /></div>
                    <div className={s.info}>
                      <span className={s.name}>{item.name}</span>
                      <span className={`${s.stock} ${item.quantity === 0 ? s.stockEmpty : ''}`}>
                        {item.quantity} / {item.max_quantity} {item.unit}
                      </span>
                    </div>
                    <div className={s.stepper}>
                      <button
                        className={s.stepBtn}
                        onClick={() => step(item.id, -1, need)}
                        disabled={val === 0}
                        aria-label="Decrease"
                      >
                        <MinusIcon size={13} />
                      </button>
                      <span className={`${s.stepVal} ${val > 0 ? s.stepValActive : ''}`}>{val}</span>
                      <button
                        className={s.stepBtn}
                        onClick={() => step(item.id, 1, need)}
                        disabled={val >= need}
                        aria-label="Increase"
                      >
                        <PlusIcon size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={s.footer}>
              <button
                className={`${s.updateBtn} ${done ? s.updateBtnDone : ''}`}
                onClick={updateStock}
                disabled={saving || done || !anyBought}
              >
                {done ? `✓ ${t('done_shopping')}` : t(saving ? 'saving' : 'update_stock')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
