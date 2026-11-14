import { useEffect, useState } from 'react'
import { supabase, VAPID_PUBLIC_KEY } from '../lib/supabase'

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Retries on network errors: treating a failed request as "no family" would send the
// user to onboarding, where they could accidentally create a second household.
async function fetchMembership(userId) {
  for (let attempt = 1; ; attempt++) {
    const { data, error } = await supabase
      .from('household_members')
      .select('role, households(id, name, invite_code)')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle()
    if (!error) return data
    if (attempt === 3) throw error
    await wait(1000 * attempt)
  }
}

const PUSH_KEY = 'rasoi-push'

// Shoppers ("dad" role) get web-push alerts when items run out.
// Registers once per device — re-registering on every app open was 3 network calls + a push-service round trip.
async function subscribeToPush(userId) {
  if (!userId || !('serviceWorker' in navigator) || !('PushManager' in window)) return
  if ((await Notification.requestPermission()) !== 'granted') return
  try {
    const reg = await navigator.serviceWorker.ready
    let sub = await reg.pushManager.getSubscription()
    if (sub && localStorage.getItem(PUSH_KEY) === `${userId}|${sub.endpoint}`) return

    sub ??= await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })
    const { endpoint, keys } = sub.toJSON()
    await supabase.from('push_subscriptions').delete().eq('user_id', userId)
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({ user_id: userId, endpoint, p256dh: keys.p256dh, auth: keys.auth })
    if (!error) localStorage.setItem(PUSH_KEY, `${userId}|${endpoint}`)
  } catch {
    // push is best-effort
  }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [household, setHousehold] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadMembership(u) {
    setLoading(true)
    setError(false)
    try {
      const m = await fetchMembership(u.id)
      setRole(m?.role ?? null)
      setHousehold(m?.households ?? null)
      if (m?.role === 'dad') subscribeToPush(u.id)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let currentUserId
    // onAuthStateChange also fires INITIAL_SESSION on load, so no separate getSession() call
    // (that duplicate made every app open load the family twice).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      // token refreshes fire this hourly — only reload when the person actually changes
      if ((u?.id ?? null) === currentUserId) return
      currentUserId = u?.id ?? null
      if (!u) {
        setRole(null)
        setHousehold(null)
        setLoading(false)
        return
      }
      // Never await Supabase calls inside this callback: supabase-js holds an auth lock here
      // and can deadlock. Defer until the callback has returned.
      setTimeout(() => loadMembership(u), 0)
    })
    return () => subscription.unsubscribe()
  }, [])

  function completeMembershipSetup(newRole, newHousehold) {
    setRole(newRole)
    setHousehold(newHousehold)
    if (newRole === 'dad') subscribeToPush(user?.id)
  }

  function signIn() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    localStorage.removeItem(PUSH_KEY)
    if ('caches' in window) await caches.delete('supabase-api').catch(() => {})
  }

  return {
    user,
    role,
    household,
    loading,
    error,
    retry: () => user && loadMembership(user),
    signIn,
    signOut,
    completeMembershipSetup,
  }
}
