import SettingsMenu from './SettingsMenu'
import { CookingPotIcon } from './Icons'
import s from './Layout.module.css'

export default function Layout({ user, role, household, onSignOut, children }) {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.brand}>
          <div className={s.logoMark}>
            <CookingPotIcon size={18} />
          </div>
          <div className={s.brandText}>
            <span className={s.brandName}>Rasoi</span>
            {household?.name && <span className={s.familyName}>{household.name}</span>}
          </div>
        </div>
        <SettingsMenu user={user} role={role} household={household} onSignOut={onSignOut} />
      </header>
      <main className={s.main}>{children}</main>
    </div>
  )
}
