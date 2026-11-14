self.addEventListener('push', (event) => {
  let data = {}
  try { if (event.data) data = event.data.json() } catch (_) {}
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Rasoi Alert', {
      body: data.body ?? 'An item needs restocking!',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      data: { url: data.url ?? '/' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus()
      }
      // L-2: Validate URL scheme before opening to prevent javascript:/data: injection
      const rawUrl = event.notification.data?.url ?? '/'
      const safeUrl = /^https?:\/\//.test(rawUrl) ? rawUrl : '/'
      if (clients.openWindow) return clients.openWindow(safeUrl)
    })
  )
})
