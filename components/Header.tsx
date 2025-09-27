'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // This helper function checks if we're on the current page
  const isActive = (path: string) => pathname === path

  return (
    <>
      <style jsx global>{`
        @keyframes goldGlow {
          0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
          100% { box-shadow: 0 0 20px 2px rgba(255, 215, 0, 0.4); }
        }

        .nav-pill {
          position: relative;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 8px 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          transition: all 250ms ease;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .nav-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 250ms ease;
          pointer-events: none;
        }

        .nav-pill:hover::before,
        .nav-pill:focus-within::before {
          opacity: 1;
        }

        .nav-pill:hover,
        .nav-pill:focus-within {
          transform: scale(1.02);
          border-color: rgba(255, 220, 150, 0.6);
          box-shadow: 0 0 0 2px rgba(255, 220, 150, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .nav-pill.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 220, 150, 0.6);
          box-shadow: 0 0 12px 1px rgba(255, 220, 150, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 250ms ease;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 250ms ease;
          pointer-events: none;
        }

        .cta-button:hover::before,
        .cta-button:focus::before {
          transform: translate(-50%, -50%) scale(2);
        }

        .cta-button:hover,
        .cta-button:focus {
          transform: scale(1.05);
          box-shadow: 0 0 25px 3px rgba(255, 215, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .mobile-nav-item {
          position: relative;
          transition: all 200ms ease;
        }

        .mobile-nav-item:hover,
        .mobile-nav-item:focus {
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
          transform: translateX(4px);
        }
      `}</style>

      <header className="sticky top-0 z-50 shadow-lg" style={{
        background: 'linear-gradient(90deg, rgba(26, 40, 69, 0.85) 0%, rgba(26, 40, 69, 0.80) 50%, rgba(255, 179, 102, 0.75) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        boxShadow: '0 4px 12px rgba(13, 20, 36, 0.2), inset 0 1px 0 rgba(255, 220, 150, 0.1)'
      }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                RVA Glow Co
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/"
                className={`nav-pill ${isActive('/') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  Home
                </span>
              </Link>
              <Link
                href="/services"
                className={`nav-pill ${isActive('/services') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  Services
                </span>
              </Link>
              <Link
                href="/faq"
                className={`nav-pill ${isActive('/faq') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  FAQ
                </span>
              </Link>
              <Link
                href="/about"
                className={`nav-pill ${isActive('/about') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  About
                </span>
              </Link>
              <Link
                href="/contact"
                className={`nav-pill ${isActive('/contact') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  Contact
                </span>
              </Link>
            </div>

            {/* Call to Action Button */}
            <div className="hidden md:block">
              <Link
                href="/booking"
                className="cta-button text-white px-6 py-3 rounded-full font-semibold"
                style={{
                  background: 'linear-gradient(90deg, #2F7E80 0%, #EB834F 60%, #D69C7A 100%)',
                  border: '1.5px solid #ffdc96',
                  boxShadow: '0 0 0 0.5px rgba(255, 220, 150, 0.5), 0 6px 12px rgba(255, 179, 102, 0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 focus:bg-white/20 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-up pb-4">
              <div className="px-2 pt-2 pb-3 space-y-2">
                <Link
                  href="/"
                  className={`mobile-nav-item ${
                    isActive('/') ? 'bg-gradient-to-r from-white/30 to-transparent' : ''
                  } block px-4 py-3 rounded-xl text-base font-medium text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className={`mobile-nav-item ${
                    isActive('/services') ? 'bg-gradient-to-r from-white/30 to-transparent' : ''
                  } block px-4 py-3 rounded-xl text-base font-medium text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/faq"
                  className={`mobile-nav-item ${
                    isActive('/faq') ? 'bg-gradient-to-r from-white/30 to-transparent' : ''
                  } block px-4 py-3 rounded-xl text-base font-medium text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/about"
                  className={`mobile-nav-item ${
                    isActive('/about') ? 'bg-gradient-to-r from-white/30 to-transparent' : ''
                  } block px-4 py-3 rounded-xl text-base font-medium text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`mobile-nav-item ${
                    isActive('/contact') ? 'bg-gradient-to-r from-white/30 to-transparent' : ''
                  } block px-4 py-3 rounded-xl text-base font-medium text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/booking"
                  className="cta-button text-white block px-4 py-3 rounded-full text-center font-semibold mt-4"
                  style={{
                    background: 'linear-gradient(90deg, #2F7E80 0%, #EB834F 60%, #D69C7A 100%)',
                    border: '1.5px solid #ffdc96',
                    boxShadow: '0 0 0 0.5px rgba(255, 220, 150, 0.5), 0 6px 12px rgba(255, 179, 102, 0.3)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}