import { useLayoutEffect } from 'react'

// Freezes the page behind a modal/sheet. `overflow: hidden` alone doesn't stop iOS Safari,
// so the body is pinned with position: fixed and the scroll position restored on close.
export function useLockBodyScroll() {
  useLayoutEffect(() => {
    const y = window.scrollY
    const body = document.body.style
    const prev = { position: body.position, top: body.top, width: body.width, overflow: body.overflow }
    Object.assign(body, { position: 'fixed', top: `-${y}px`, width: '100%', overflow: 'hidden' })
    return () => {
      Object.assign(body, prev)
      window.scrollTo({ top: y, behavior: 'instant' }) // html has smooth scrolling; don't animate back
    }
  }, [])
}
