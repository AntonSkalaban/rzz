"use client"

export function disableDoubleTapZoom() {
  let lastTouchEnd = 0
  document.addEventListener(
    "touchend",
    (event) => {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        // 300ms is a common threshold for double-tap
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false,
  )
}
