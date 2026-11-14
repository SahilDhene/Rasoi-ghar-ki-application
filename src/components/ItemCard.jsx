import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import StockBar from './StockBar'
import {
  AlertCircleIcon, CartIcon, CheckCircleIcon, CupIcon, DropletIcon, FlameIcon, LayersIcon,
  LeafIcon, MinusIcon, PackageIcon, PencilIcon, PlusIcon, TrashIcon, XCircleIcon,
} from './Icons'
import s from './ItemCard.module.css'

const CATEGORY_ICONS = {
  Vegetables: LeafIcon,
  Dairy: DropletIcon,
  Grains: LayersIcon,
  Spices: FlameIcon,
  Beverages: CupIcon,
  Snacks: PackageIcon,
  Other: PackageIcon,
  General: CartIcon,
}

const CATEGORY_COLORS = {
  Vegetables: { bg: 'rgba(52,211,153,0.12)', color: '#34d399' },
  Dairy: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  Grains: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  Spices: { bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
  Beverages: { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa' },
  Snacks: { bg: 'rgba(251,146,60,0.12)', color: '#fb923c' },
  Other: { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
  General: { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
}

const STATUS = {
  stocked: { labelKey: 'status_stocked', Icon: CheckCircleIcon },
  low: { labelKey: 'status_low', Icon: AlertCircleIcon },
  empty: { labelKey: 'status_empty', Icon: XCircleIcon },
}

function stockStatus(quantity, max) {
  if (quantity === 0) return 'empty'
  return quantity / max <= 0.25 ? 'low' : 'stocked'
}

export default function ItemCard({ item, role, onUpdateQuantity, onUpdateNote, onDelete }) {
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

  const CategoryIcon = CATEGORY_ICONS[category] ?? CATEGORY_ICONS.General
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.General

  return (
    <div className={s.card}>
      <div className={s.top}>
        <div className={s.catIcon} style={{ background: colors.bg, color: colors.color }}>
          {emoji && emoji !== '🛒' ? <span className={s.emoji}>{emoji}</span> : <CategoryIcon size={20} />}
        </div>
        <div className={s.info}>
          <span className={s.name}>{name}</span>
          <span className={s.category}>{category}</span>
        </div>
        <span className={`${s.tag} ${s[status]}`}>
          <StatusIcon size={11} />
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
            <button className={`${s.ctrlBtn} ${s.deleteBtn}`} onClick={() => onDelete(id)} aria-label="Delete">
              <TrashIcon size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
