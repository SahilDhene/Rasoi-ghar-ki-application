import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

export default function App() {
  const { user, role, household, loading, signIn, signOut, completeMembershipSetup } = useAuth()

  if (window.location.pathname !== '/') return <NotFound />
  if (loading)
    return (
      <div className="spinnerWrap">
        <div className="spinnerRing" />
      </div>
    )
  if (!user) return <LoginPage onSignIn={signIn} />
  if (!role) return <Onboarding user={user} onComplete={completeMembershipSetup} />

  return (
    <Layout user={user} role={role} household={household} onSignOut={signOut}>
      <Dashboard role={role} householdId={household?.id} />
    </Layout>
  )
}
