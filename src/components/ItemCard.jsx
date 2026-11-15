import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import StockBar from './StockBar'
import Emoji from './Emoji'
import { categoryLabel, getCategory } from '../lib/categories'
import { stockStatus } from '../lib/stock'
import {
  AlertCircleIcon, AppleIcon, BottleIcon, BowlIcon, BoxIcon, CartIcon, CheckCircleIcon, CupIcon, DiyaIcon,
  DropletIcon, FlameIcon, LayersIcon, LeafIcon, MinusIcon, PackageIcon, PencilIcon, PlusIcon,
  SparkleIcon, TrashIcon, XCircleIcon,
} from './Icons'
import s from './ItemCard.module.css'

// Shown when the item has no emoji
const CATEGORY_ICONS = {
  Vegetables: LeafIcon,
  Fruits: AppleIcon,
  Dairy: DropletIcon,
  Grains: LayersIcon,
  Pulses: BowlIcon,
  Spices: FlameIcon,
  Oil: BottleIcon,
  Snacks: PackageIcon,
  Beverages: CupIcon,
  Pooja: DiyaIcon,
  Cleaning: SparkleIcon,
  Other: BoxIcon,
}

const STATUS = {
  stocked: { labelKey: 'status_stocked', Icon: CheckCircleIcon },
  low: { labelKey: 'status_low', Icon: AlertCircleIcon },
  empty: { labelKey: 'status_empty', Icon: XCircleIcon },
}

export default function ItemCard({ item, index = 0, role, onUpdateQuantity, onUpdateNote, onDelete }) {
  const { t } = useLang()
  const { id, emoji, name, category, quantity, max_quantity, unit, note } = item
  const status = stockStatus(quantity, max_quantity)
  const canEdit = role === 'mom'
  const { labelKey, Icon: StatusIcon } = STATUS[status]
  const [editingNote, setEditingNote] = useState(false)
  const [draft, setDraft] = useState(note ?? '')

  // keep draft in sync with realtime updates while not editing
  useEffect(() => {
    if (!editingNote) setDraft(note ?? '')
  }, [note, editingNote])

  function saveNote() {
    setEditingNote(false)
    const next = draft.trim() || null
    if (next !== (note ?? null)) onUpdateNote(id, next)
  }

  function onNoteKey(e) {
    if (e.key === 'Enter') e.target.blur()
    if (e.key === 'Escape') {
      setDraft(note ?? '')
      setEditingNote(false)
    }
  }

  const CategoryIcon = CATEGORY_ICONS[category] ?? CartIcon
  const colors = getCategory(category)

  return (
    <div className={s.card} style={{ '--i': index }}>
      <div className={s.top}>
        <div className={s.catIcon} style={{ background: colors.bg, color: colors.color }}>
          {emoji && emoji !== '🛒' ? <span className={s.emoji}><Emoji char={emoji} /></span> : <CategoryIcon size={20} />}
        </div>
        <div className={s.info}>
          <span className={s.name}>{name}</span>
          <span className={s.category}>{categoryLabel(t, category)}</span>
        </div>
        <span className={`${s.tag} ${s[status]}`}>
          <StatusIcon size={12} className="fi-on" />
          {t(labelKey)}
        </span>
      </div>

      <StockBar quantity={quantity} maxQuantity={max_quantity} />

      {(canEdit || note) && (
        <div className={s.noteSection}>
          {editingNote ? (
            <input
              className={s.noteInput}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={saveNote}
              onKeyDown={onNoteKey}
              autoFocus
              maxLength={120}
              placeholder={t('note_placeholder')}
            />
          ) : (
            <div
              className={`${s.noteDisplay} ${canEdit ? s.noteEditable : ''} ${note ? '' : s.noteEmpty}`}
              onClick={canEdit ? () => setEditingNote(true) : undefined}
              role={canEdit ? 'button' : undefined}
              tabIndex={canEdit ? 0 : undefined}
              onKeyDown={canEdit ? (e) => e.key === 'Enter' && setEditingNote(true) : undefined}
            >
              <PencilIcon size={11} className={s.noteIcon} />
              <span className={s.noteText}>{note || t('add_note')}</span>
            </div>
          )}
        </div>
      )}

      <div className={s.bottom}>
        <span className={s.qty}>
          {quantity} <span className={s.qtyMax}>/ {max_quantity} {unit}</span>
        </span>
        {canEdit && (
          <div className={s.controls}>
            <button
              className={s.ctrlBtn}
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity === 0}
              aria-label="Decrease"
            >
              <MinusIcon size={14} />
            </button>
            <button
              className={s.ctrlBtn}
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={quantity >= max_quantity}
              aria-label="Increase"
            >
              <PlusIcon size={14} />
            </button>
            <button className={`${s.ctrlBtn} ${s.deleteBtn}`} onClick={() => onDelete(item)} aria-label="Delete">
              <TrashIcon size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
