import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../lib/theme'
import { useLang } from '../lib/i18n'
import { LogOutIcon, MoonIcon, SettingsIcon, SunIcon } from './Icons'
import s from './SettingsMenu.module.css'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
]

export default function SettingsMenu({ user, role, household, onSignOut }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme, setDark, setLight } = useTheme()
  const { lang, setLang, t } = useLang()
  const ref = useRef(null)

  // close when clicking outside
  useEffect(() => {
    function onMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  function copyCode() {
    navigator.clipboard.writeText(household.invite_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const name = user.user_metadata?.full_name ?? user.email
  const avatar = user.user_metadata?.avatar_url

  return (
    <div className={s.wrapper} ref={ref}>
      <button
        className={`${s.trigger} ${open ? s.triggerOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Settings"
        aria-expanded={open}
      >
        <SettingsIcon size={17} />
      </button>

      {open && (
        <div className={s.dropdown}>
          <div className={s.accountSection}>
            {avatar && <img src={avatar} alt={name} className={s.avatar} referrerPolicy="no-referrer" />}
            <div className={s.accountInfo}>
              <span className={s.accountName}>{name}</span>
              <span className={s.accountEmail}>{user.email}</span>
            </div>
          </div>
          <div className={s.divider} />

          {role === 'mom' && household?.invite_code && (
            <>
              <div className={s.section}>
                <span className={s.sectionLabel}>{t('family_invite_code')}</span>
                <div className={s.inviteRow}>
                  <span className={s.inviteCode}>{household.invite_code}</span>
                  <button className={s.copyBtn} onClick={copyCode}>
                    {copied ? '✓' : t('copy')}
                  </button>
                </div>
                <p className={s.inviteHint}>{t('share_with_family')}</p>
              </div>
              <div className={s.divider} />
            </>
          )}

          <div className={s.section}>
            <span className={s.sectionLabel}>{t('theme')}</span>
            <div className={s.themeToggle}>
              <button className={`${s.themeBtn} ${theme === 'dark' ? s.themeActive : ''}`} onClick={setDark}>
                <MoonIcon size={14} /> {t('dark')}
              </button>
              <button className={`${s.themeBtn} ${theme === 'light' ? s.themeActive : ''}`} onClick={setLight}>
                <SunIcon size={14} /> {t('light')}
              </button>
            </div>
          </div>
          <div className={s.divider} />

          <div className={s.section}>
            <span className={s.sectionLabel}>{t('language')}</span>
            <div className={s.themeToggle}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  className={`${s.themeBtn} ${lang === l.code ? s.themeActive : ''}`}
                  onClick={() => setLang(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className={s.divider} />

          <button
            className={s.signOutBtn}
            onClick={() => {
              setOpen(false)
              onSignOut()
            }}
          >
            <LogOutIcon size={15} /> {t('sign_out')}
          </button>
        </div>
      )}
    </div>
  )
}
