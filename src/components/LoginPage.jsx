import { useLang } from '../lib/i18n'
import { CookingPotIcon, GoogleIcon } from './Icons'
import s from './LoginPage.module.css'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
]

export default function LoginPage({ onSignIn }) {
  const { lang, setLang, t } = useLang()

  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.logoMark}>
          <CookingPotIcon size={28} />
        </div>
        <h1 className={s.title}>Ghar Ki Rasoi</h1>
        <p className={s.sub}>{t('login_subtitle')}</p>
        <button className={s.googleBtn} onClick={onSignIn}>
          <GoogleIcon />
          {t('login_google')}
        </button>
        <div className={s.langBar}>
          {LANGUAGES.map((l, i) => (
            <span key={l.code} className={s.langItem}>
              {i > 0 && <span className={s.langDot}>·</span>}
              <button
                className={`${s.langBtn} ${lang === l.code ? s.langBtnActive : ''}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className={s.bgGlow} aria-hidden="true" />
    </div>
  )
}
