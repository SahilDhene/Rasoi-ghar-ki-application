import { useLang } from '../lib/i18n'
import s from './FilterBar.module.css'

const FILTERS = [
  { key: 'all', tk: 'filter_all' },
  { key: 'empty', tk: 'filter_empty' },
  { key: 'low', tk: 'filter_low' },
  { key: 'stocked', tk: 'filter_stocked' },
]

export default function FilterBar({ activeFilter, onFilterChange }) {
  const { t } = useLang()
  return (
    <div className={s.row}>
      {FILTERS.map(({ key, tk }) => (
        <button
          key={key}
          className={`${s.chip} ${activeFilter === key ? s.active : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {t(tk)}
        </button>
      ))}
    </div>
  )
}
