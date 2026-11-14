import { useAuth } from './hooks/useAuth'
import { useLang } from './lib/i18n'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

export default function App() {
  const { user, role, household, loading, error, retry, signIn, signOut, completeMembershipSetup } = useAuth()
  const { t } = useLang()

  if (window.location.pathname !== '/') return <NotFound />
  if (loading)
    return (
      <div className="spinnerWrap">
        <div className="spinnerRing" />
      </div>
    )
  if (!user) return <LoginPage onSignIn={signIn} />
  if (error)
    return (
      <div className="spinnerWrap errorScreen">
        <p>{t('connect_error')}</p>
        <button onClick={retry}>{t('retry')}</button>
      </div>
    )
  if (!role) return <Onboarding user={user} onComplete={completeMembershipSetup} />

  return (
    <Layout user={user} role={role} household={household} onSignOut={signOut}>
      <Dashboard role={role} householdId={household?.id} />
    </Layout>
  )
}
