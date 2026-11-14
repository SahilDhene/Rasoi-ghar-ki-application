import { lazy, Suspense, useState } from 'react'
import { useTheme } from '../lib/theme'
import { useLang } from '../lib/i18n'
import { CATEGORIES, UNITS, categoryLabel } from '../lib/categories'
import { KIRANA_EMOJIS, itemName, searchCatalog } from '../lib/catalog'
import { CloseIcon, PlusIcon } from './Icons'
import Emoji from './Emoji'
import s from './AddItemModal.module.css'

const EmojiPicker = lazy(() => import('./EmojiPickerLazy'))

export default function AddItemModal({ onAdd, onClose, existingNames = [] }) {
  const { theme } = useTheme()
  const { lang, t } = useLang()
  const [form, setForm] = useState({ name: '', category: 'Vegetables', max_quantity: '', unit: 'pcs', note: '' })
  const [emoji, setEmoji] = useState('🛒')
  const [quickQuery, setQuickQuery] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerTab, setPickerTab] = useState('kirana') // kirana | all
  const [emojiQuery, setEmojiQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  // empty search → popular items in the selected category
  const suggestions = searchCatalog(quickQuery, { category: form.category, exclude: existingNames })

  function pickCatalogItem(item) {
    setEmoji(item.emoji)
    setForm((f) => ({
      ...f,
      name: itemName(item, lang),
      category: item.category,
      unit: item.unit,
      max_quantity: String(item.max),
    }))
    setError('')
  }

  function pickEmoji(native) {
    setEmoji(native)
    setPickerOpen(false)
  }

  const q = emojiQuery.trim().toLowerCase()
  const kiranaTiles = q ? KIRANA_EMOJIS.filter((e) => e.items.some((i) => i.search.includes(q))) : KIRANA_EMOJIS

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
            <div className={s.quickAdd}>
              <label className={s.label}>
                {t('quick_add')}
                <input
                  className={s.input}
                  type="search"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder={t('quick_add_placeholder')}
                  autoFocus
                />
              </label>
              {!quickQuery && suggestions.length > 0 && (
                <span className={s.quickHint}>
                  {t('popular_in', { cat: categoryLabel(t, form.category) })}
                </span>
              )}
              {suggestions.length > 0 ? (
                <div className={s.chips}>
                  {suggestions.map((item) => {
                    const name = itemName(item, lang)
                    return (
                      <button
                        key={item.names.en}
                        type="button"
                        className={`${s.chip} ${form.name === name ? s.chipActive : ''}`}
                        onClick={() => pickCatalogItem(item)}
                      >
                        <Emoji char={item.emoji} />
                        {name}
                      </button>
                    )
                  })}
                </div>
              ) : (
                quickQuery && <span className={s.quickHint}>{t('no_matches')}</span>
              )}
            </div>

            <div className={s.emojiRow}>
              <button type="button" className={s.emojiTrigger} onClick={() => setPickerOpen(true)} aria-label="Choose emoji">
                <span className={s.emojiPreview}><Emoji char={emoji} /></span>
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
                required
              />
            </label>

            <label className={s.label}>
              {t('category_label')}
              <select className={s.input} value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {categoryLabel(t, c.key)}
                  </option>
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
            <div className={s.tabs}>
              {['kirana', 'all'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${s.chip} ${pickerTab === tab ? s.chipActive : ''}`}
                  onClick={() => setPickerTab(tab)}
                >
                  {t(tab === 'kirana' ? 'kirana_emojis' : 'all_emojis')}
                </button>
              ))}
            </div>
            <div className={s.pickerBody}>
              {pickerTab === 'kirana' ? (
                <div className={s.kiranaBody}>
                  <input
                    className={s.input}
                    type="search"
                    value={emojiQuery}
                    onChange={(e) => setEmojiQuery(e.target.value)}
                    placeholder={t('search_emoji')}
                  />
                  <div className={s.emojiGrid}>
                    {kiranaTiles.map(({ emoji: e, items }) => {
                      const names = items.map((i) => itemName(i, lang))
                      const shown = q ? items.find((i) => i.search.includes(q)) : items[0]
                      return (
                        <button
                          key={e}
                          type="button"
                          className={s.emojiTile}
                          onClick={() => pickEmoji(e)}
                          title={names.join(', ')}
                          aria-label={names.join(', ')}
                        >
                          <span className={s.tileEmoji}><Emoji char={e} /></span>
                          <span className={s.tileName}>{itemName(shown, lang)}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Suspense fallback={<div className={s.pickerLoading}>{t('loading_emojis')}</div>}>
                  <EmojiPicker onEmojiSelect={(e) => pickEmoji(e.native)} theme={theme} />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
