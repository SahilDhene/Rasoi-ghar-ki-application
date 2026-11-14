import { useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../lib/i18n'
import s from './FilterBar.module.css'

const FILTERS = [
  { key: 'all', tk: 'filter_all' },
  { key: 'empty', tk: 'filter_empty' },
  { key: 'low', tk: 'filter_low' },
  { key: 'stocked', tk: 'filter_stocked' },
]

// Fluent-style tab list: the selected underline slides to the active tab.
export default function FilterBar({ activeFilter, onFilterChange }) {
  const { lang, t } = useLang()
  const tabs = useRef({})
  const [bar, setBar] = useState(null)

  useLayoutEffect(() => {
    function measure() {
      const el = tabs.current[activeFilter]
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeFilter, lang]) // labels change width when the language changes

  return (
    <div className={s.row} role="tablist">
      {FILTERS.map(({ key, tk }) => (
        <button
          key={key}
          ref={(el) => (tabs.current[key] = el)}
          role="tab"
          aria-selected={activeFilter === key}
          className={`${s.tab} ${activeFilter === key ? s.active : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {/* bold copy reserves width so the tab doesn't jump when it becomes bold */}
          <span className={s.label} data-text={t(tk)}>
            {t(tk)}
          </span>
        </button>
      ))}
      {bar && (
        <span
          className={s.indicator}
          style={{ transform: `translateX(${bar.left}px)`, width: bar.width }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
