import SettingsMenu from './SettingsMenu'
import s from './Layout.module.css'

export default function Layout({ user, role, household, onSignOut, children }) {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.brand}>
          <img src="/logo.svg" alt="" className={s.logoMark} />
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
