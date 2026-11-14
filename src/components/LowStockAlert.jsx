import { useState } from 'react'
import { useLang } from '../lib/i18n'
import { AlertTriangleIcon, CloseIcon, WhatsAppIcon } from './Icons'
import s from './LowStockAlert.module.css'

export default function LowStockAlert({ items }) {
  const { t } = useLang()
  const [dismissed, setDismissed] = useState(false)
  if (dismissed || items.length === 0) return null

  const names = items.map((i) => i.name).join(', ')

  function shareOnWhatsApp() {
    const header = `🛒 *${t('shopping_list_title')}*`
    const lines = items
      .map((item) => {
        const empty = item.quantity === 0
        const need = item.max_quantity - item.quantity
        const dot = empty ? '🔴' : '🟡'
        const atHome = empty ? '' : ` _(${item.quantity} ${t('at_home')})_`
        const note = item.note ? item.note.replace(/[*_~`]/g, '') : null // strip WhatsApp formatting chars
        const noteLine = note ? `\n    _"${note}"_` : ''
        return `${dot} *${item.name}* — ${need} ${item.unit}${atHome}${noteLine}`
      })
      .join('\n')
    const text = `${header}\n\n${lines}\n\n_Ghar Ki Rasoi_ 🏠`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <div className={s.strip}>
      <div className={s.stripTop}>
        <AlertTriangleIcon size={15} className={s.icon} />
        <p className={s.text}>
          <strong>{t('need_to_buy')}</strong> {names}
        </p>
        <button className={s.closeBtn} onClick={() => setDismissed(true)} aria-label={t('dismiss')}>
          <CloseIcon size={14} />
        </button>
      </div>
      <button className={s.waBtn} onClick={shareOnWhatsApp}>
        <WhatsAppIcon size={14} />
        {t('share_whatsapp')}
      </button>
    </div>
  )
}
