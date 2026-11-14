import { useLang } from '../lib/i18n'
import { SortAlphaIcon, SortStatusIcon } from './Icons'
import s from './SortToggle.module.css'

export default function SortToggle({ sortMode, onSortChange }) {
  const { t } = useLang()
  return (
    <div className={s.group}>
      <button
        className={`${s.btn} ${sortMode === 'status' ? s.active : ''}`}
        onClick={() => onSortChange('status')}
      >
        <SortStatusIcon size={15} />
        <span>{t('sort_status')}</span>
      </button>
      <button
        className={`${s.btn} ${sortMode === 'alpha' ? s.active : ''}`}
        onClick={() => onSortChange('alpha')}
      >
        <SortAlphaIcon size={15} />
        <span>{t('sort_alpha')}</span>
      </button>
    </div>
  )
}
