'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function GlowingCard({ children, className = '', style = {} }: GlowingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handlePointerMove = (e: PointerEvent) => {
      const position = pointerPositionRelativeToElement(card, e)
      const [px, py] = position.pixels
      const [perx, pery] = position.percent
      const [dx, dy] = distanceFromCenter(card, px, py)
      const edge = closenessToEdge(card, px, py)
      const angle = angleFromPointerEvent(dx, dy)

      card.style.setProperty('--pointer-x', `${round(perx)}%`)
      card.style.setProperty('--pointer-y', `${round(pery)}%`)
      card.style.setProperty('--pointer-deg', `${round(angle)}deg`)
      card.style.setProperty('--pointer-d', `${round(edge * 100)}`)
    }

    card.addEventListener('pointermove', handlePointerMove)

    return () => {
      card.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`glowing-card ${className}`}
      style={style}
    >
      <span className="glow-effect"></span>
      <div className="card-inner">
        {children}
      </div>
    </div>
  )
}

function centerOfElement($el: HTMLElement) {
  const { width, height } = $el.getBoundingClientRect()
  return [width / 2, height / 2]
}

function pointerPositionRelativeToElement($el: HTMLElement, e: PointerEvent) {
  const pos = [e.clientX, e.clientY]
  const { left, top, width, height } = $el.getBoundingClientRect()
  const x = pos[0] - left
  const y = pos[1] - top
  const px = clamp((100 / width) * x)
  const py = clamp((100 / height) * y)
  return { pixels: [x, y], percent: [px, py] }
}

function angleFromPointerEvent(dx: number, dy: number) {
  let angleRadians = 0
  let angleDegrees = 0
  if (dx !== 0 || dy !== 0) {
    angleRadians = Math.atan2(dy, dx)
    angleDegrees = angleRadians * (180 / Math.PI) + 90
    if (angleDegrees < 0) {
      angleDegrees += 360
    }
  }
  return angleDegrees
}

function distanceFromCenter($card: HTMLElement, x: number, y: number) {
  const [cx, cy] = centerOfElement($card)
  return [x - cx, y - cy]
}

function closenessToEdge($card: HTMLElement, x: number, y: number) {
  const [cx, cy] = centerOfElement($card)
  const [dx, dy] = distanceFromCenter($card, x, y)
  let k_x = Infinity
  let k_y = Infinity
  if (dx !== 0) {
    k_x = cx / Math.abs(dx)
  }
  if (dy !== 0) {
    k_y = cy / Math.abs(dy)
  }
  return clamp(1 / Math.min(k_x, k_y), 0, 1)
}

function round(value: number, precision = 3) {
  return parseFloat(value.toFixed(precision))
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max)
}