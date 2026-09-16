import { useEffect } from 'react'

/**
 * useFocusTrap — Phase 23
 *
 * Traps keyboard focus inside `containerRef` while `active` is true.
 * Also moves focus to the first focusable element when the trap activates.
 *
 * @param {React.RefObject} containerRef — ref attached to the modal container
 * @param {boolean}         active       — enables/disables the trap
 */
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current

    /* Save the element that was focused before the modal opened */
    const previouslyFocused = document.activeElement

    /* Collect all keyboard-reachable elements */
    const FOCUSABLE = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const getFocusable = () => [...container.querySelectorAll(FOCUSABLE)]

    /* Move focus in on open */
    const initial = getFocusable()[0]
    initial?.focus()

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      if (!focusable.length) { e.preventDefault(); return }

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey) {
        /* Shift+Tab: wrap from first → last */
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        /* Tab: wrap from last → first */
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      /* Restore focus to the element that opened the modal */
      previouslyFocused?.focus()
    }
  }, [active, containerRef])
}
