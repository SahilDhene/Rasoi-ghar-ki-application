import { useEffect, useState } from 'react'
import { supabase, VAPID_PUBLIC_KEY } from '../lib/supabase'

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

async function fetchMembership(userId) {
  const { data } = await supabase
    .from('household_members')
    .select('role, households(id, name, invite_code)')
    .eq('user_id', userId)
    .single()
  return data
}

// Shoppers ("dad" role) get web-push alerts when items run out.
async function subscribeToPush(userId) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
  if ((await Notification.requestPermission()) !== 'granted') return
  try {
    const reg = await navigator.serviceWorker.ready
    const existing = await reg.pushManager.getSubscription()
    if (existing) await existing.unsubscribe()
    await supabase.from('push_subscriptions').delete().eq('user_id', userId)

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })
    const { endpoint, keys } = sub.toJSON()
    await supabase
      .from('push_subscriptions')
      .upsert({ user_id: userId, endpoint, p256dh: keys.p256dh, auth: keys.auth })
  } catch {
    // push is best-effort
  }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [household, setHousehold] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadMembership(u) {
    const m = await fetchMembership(u.id)
    if (m) {
      setRole(m.role)
      setHousehold(m.households)
      if (m.role === 'dad') subscribeToPush(u.id)
    } else {
      setRole(null)
      setHousehold(null)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) await loadMembership(u)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) await loadMembership(u)
      else {
        setRole(null)
        setHousehold(null)
      }
      setLoading(false)
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
    if ('caches' in window) await caches.delete('supabase-api').catch(() => {})
  }

  return { user, role, household, loading, signIn, signOut, completeMembershipSetup }
}
