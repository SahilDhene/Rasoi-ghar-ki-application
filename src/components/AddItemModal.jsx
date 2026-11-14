import { lazy, Suspense, useState } from 'react'
import { useTheme } from '../lib/theme'
import { useLang } from '../lib/i18n'
import { CloseIcon, PlusIcon } from './Icons'
import s from './AddItemModal.module.css'

const EmojiPicker = lazy(() => import('./EmojiPickerLazy'))

const CATEGORIES = ['Vegetables', 'Dairy', 'Grains', 'Spices', 'Beverages', 'Snacks', 'Other']
const UNITS = ['kg', 'g', 'litre', 'ml', 'pcs', 'packet', 'dozen']

export default function AddItemModal({ onAdd, onClose }) {
  const { theme } = useTheme()
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', category: 'Vegetables', max_quantity: '', unit: 'pcs', note: '' })
  const [emoji, setEmoji] = useState('🛒')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  function pickEmoji(e) {
    setEmoji(e.native)
    setPickerOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError(t('err_name_required'))
    if (!form.max_quantity || Number(form.max_quantity) <= 0) return setError(t('err_max_qty'))
    setSaving(true)
    setError('')
    try {
      await onAdd({
        emoji,
        name: form.name.trim(),
        category: form.category,
        max_quantity: Number(form.max_quantity),
        unit: form.unit,
        note: form.note.trim() || null,
        quantity: 0,
      })
      onClose()
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <>
      <div className={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className={s.modal}>
          <div className={s.modalHeader}>
            <h2 className={s.title}>{t('add_item')}</h2>
            <button className={s.closeBtn} onClick={onClose} aria-label="Close">
              <CloseIcon size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.emojiRow}>
              <button type="button" className={s.emojiTrigger} onClick={() => setPickerOpen(true)} aria-label="Choose emoji">
                <span className={s.emojiPreview}>{emoji}</span>
              </button>
              <div className={s.emojiMeta}>
                <span className={s.emojiLabel}>{t('item_emoji')}</span>
                <button type="button" className={s.emojiChange} onClick={() => setPickerOpen(true)}>
                  {t('change')}
                </button>
              </div>
            </div>

            <label className={s.label}>
              {t('name_label')}
              <input
                className={s.input}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={t('name_placeholder')}
                autoFocus
                required
              />
            </label>

            <label className={s.label}>
              {t('category_label')}
              <select className={s.input} value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>

            <div className={s.row}>
              <label className={`${s.label} ${s.grow}`}>
                {t('max_qty_label')}
                <input
                  className={s.input}
                  type="number"
                  min="1"
                  value={form.max_quantity}
                  onChange={(e) => set('max_quantity', e.target.value)}
                  placeholder="10"
                  required
                />
              </label>
              <label className={s.label}>
                {t('unit_label')}
                <select className={s.input} value={form.unit} onChange={(e) => set('unit', e.target.value)}>
                  {UNITS.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className={s.label}>
              {t('note_label')}
              <input
                className={s.input}
                value={form.note}
                onChange={(e) => set('note', e.target.value)}
                placeholder={t('note_placeholder')}
                maxLength={120}
              />
            </label>

            {error && <p className={s.error}>{error}</p>}

            <div className={s.actions}>
              <button type="button" className={s.cancelBtn} onClick={onClose}>
                {t('cancel')}
              </button>
              <button type="submit" className={s.saveBtn} disabled={saving}>
                <PlusIcon size={16} />
                {t(saving ? 'adding' : 'add_item')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {pickerOpen && (
        <div className={s.pickerOverlay} onClick={() => setPickerOpen(false)}>
          <div className={s.pickerSheet} onClick={(e) => e.stopPropagation()}>
            <div className={s.pickerHeader}>
              <span className={s.pickerTitle}>{t('choose_emoji')}</span>
              <button className={s.pickerClose} onClick={() => setPickerOpen(false)} aria-label="Close picker">
                <CloseIcon size={18} />
              </button>
            </div>
            <div className={s.pickerBody}>
              <Suspense fallback={<div className={s.pickerLoading}>{t('loading_emojis')}</div>}>
                <EmojiPicker onEmojiSelect={pickEmoji} theme={theme} />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
