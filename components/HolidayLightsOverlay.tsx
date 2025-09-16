'use client'

import { useEffect, useState } from 'react'

interface HolidayLightsOverlayProps {
  imageUrl: string
  lightingOption: 'roof' | 'full'
}

export default function HolidayLightsOverlay({ imageUrl, lightingOption }: HolidayLightsOverlayProps) {
  const [isAnimated, setIsAnimated] = useState(true)

  // Generate random light positions for a more organic look
  const generateLights = (count: number, startX: number, startY: number, endX: number, endY: number) => {
    const lights = []
    for (let i = 0; i <= count; i++) {
      const progress = i / count
      const x = startX + (endX - startX) * progress
      const y = startY + (endY - startY) * progress
      // Add slight randomness for organic look
      const offsetX = (Math.random() - 0.5) * 2
      const offsetY = (Math.random() - 0.5) * 2
      lights.push({ x: x + offsetX, y: y + offsetY, delay: Math.random() * 2 })
    }
    return lights
  }

  // Define light strings for different parts of the house
  const rooflineLeft = generateLights(20, 10, 30, 45, 15)
  const rooflineRight = generateLights(20, 45, 15, 80, 30)
  const rooflinePeak = generateLights(15, 45, 15, 45, 5)
  const eaveLeft = generateLights(25, 10, 30, 10, 60)
  const eaveRight = generateLights(25, 80, 30, 80, 60)
  const gableFront = generateLights(12, 35, 35, 55, 35)
  const gableLeft = generateLights(10, 35, 35, 45, 25)
  const gableRight = generateLights(10, 55, 35, 45, 25)

  // Bushes and landscape lights (for full package)
  const bushLeft = generateLights(15, 15, 70, 25, 70)
  const bushCenter = generateLights(15, 35, 70, 45, 70)
  const bushRight = generateLights(15, 55, 70, 65, 70)
  const bushFarRight = generateLights(15, 70, 70, 80, 70)
  const pathLights = generateLights(20, 20, 80, 70, 80)

  const allRoofLights = [
    ...rooflineLeft,
    ...rooflineRight,
    ...rooflinePeak,
    ...eaveLeft,
    ...eaveRight,
    ...gableFront,
    ...gableLeft,
    ...gableRight,
  ]

  const allLandscapeLights = [
    ...bushLeft,
    ...bushCenter,
    ...bushRight,
    ...bushFarRight,
    ...pathLights,
  ]

  return (
    <div className="relative w-full h-full">
      {/* Original Image */}
      <img
        src={imageUrl}
        alt="Home with holiday lights"
        className="w-full h-full object-cover rounded-xl"
      />

      {/* Dark overlay to simulate night */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-blue-900/20 to-indigo-900/40 rounded-xl" />

      {/* SVG Overlay for Lights */}
      <svg
        className="absolute inset-0 w-full h-full rounded-xl"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Define the glow filter */}
        <defs>
          <filter id="lightGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Define gradient for light bulbs */}
          <radialGradient id="bulbGradient">
            <stop offset="0%" stopColor="#fffdf0" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffeb99" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.3" />
          </radialGradient>

          <radialGradient id="bulbGlow">
            <stop offset="0%" stopColor="#fff8dc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Roofline Lights */}
        {allRoofLights.map((light, index) => (
          <g key={`roof-${index}`}>
            {/* Light glow */}
            <circle
              cx={`${light.x}%`}
              cy={`${light.y}%`}
              r="2.5"
              fill="url(#bulbGlow)"
              opacity="0.6"
              className={isAnimated ? 'animate-pulse' : ''}
              style={{ animationDelay: `${light.delay}s` }}
            />
            {/* Light bulb */}
            <circle
              cx={`${light.x}%`}
              cy={`${light.y}%`}
              r="0.8"
              fill="url(#bulbGradient)"
              filter="url(#lightGlow)"
              className={isAnimated ? 'animate-pulse' : ''}
              style={{ animationDelay: `${light.delay}s` }}
            />
          </g>
        ))}

        {/* Landscape Lights (only for full package) */}
        {lightingOption === 'full' && allLandscapeLights.map((light, index) => (
          <g key={`landscape-${index}`}>
            {/* Light glow for bushes - smaller and greener tint */}
            <circle
              cx={`${light.x}%`}
              cy={`${light.y}%`}
              r="1.5"
              fill="url(#bulbGlow)"
              opacity="0.5"
              className={isAnimated ? 'animate-pulse' : ''}
              style={{ animationDelay: `${light.delay + 0.5}s` }}
            />
            {/* Mini light bulb */}
            <circle
              cx={`${light.x}%`}
              cy={`${light.y}%`}
              r="0.5"
              fill="#fffacd"
              filter="url(#lightGlow)"
              className={isAnimated ? 'animate-pulse' : ''}
              style={{ animationDelay: `${light.delay + 0.5}s` }}
            />
          </g>
        ))}

        {/* Light strings/wires connecting the lights */}
        <path
          d={`M ${rooflineLeft[0].x} ${rooflineLeft[0].y} ${rooflineLeft.map(l => `L ${l.x} ${l.y}`).join(' ')}`}
          stroke="#333"
          strokeWidth="0.1"
          fill="none"
          opacity="0.3"
        />
        <path
          d={`M ${rooflineRight[0].x} ${rooflineRight[0].y} ${rooflineRight.map(l => `L ${l.x} ${l.y}`).join(' ')}`}
          stroke="#333"
          strokeWidth="0.1"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Snow effect overlay (subtle) */}
      <div className="absolute inset-0 rounded-xl opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
      </div>

      {/* Toggle animation button */}
      <button
        onClick={() => setIsAnimated(!isAnimated)}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 hover:bg-white transition-colors"
      >
        {isAnimated ? '✨ Lights On' : '💡 Lights Off'}
      </button>
    </div>
  )
}