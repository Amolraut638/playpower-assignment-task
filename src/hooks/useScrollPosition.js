import { useState, useEffect } from 'react'

/**
 * useScrollPosition
 * Returns the current window.scrollY value.
 * Uses a passive scroll listener for performance.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
