'use client'

import { useEffect, useState } from 'react'

export default function HeroScrollEffect() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      const heroText = document.getElementById('hero-text')

      if (!heroSection || !heroText) return

      const heroRect = heroSection.getBoundingClientRect()
      const textRect = heroText.getBoundingClientRect()

      const shouldStack = window.scrollY > 200

      if (shouldStack !== scrolled) {
        setScrolled(shouldStack)

        if (shouldStack) {
          heroText.style.zIndex = '5'
        } else {
          heroText.style.zIndex = '10'
        }
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return null
}