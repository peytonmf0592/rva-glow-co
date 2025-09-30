'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // This helper function checks if we're on the current page
  const isActive = (path: string) => pathname === path

  // Handle navigation with animation delay
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (pathname !== path) {
      e.preventDefault()
      setTimeout(() => {
        router.push(path)
      }, 400)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes buttonPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(255, 193, 7, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }

        .nav-pill {
          position: relative;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 8px 16px;
          transition: all 250ms ease;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .nav-pill:hover,
        .nav-pill:focus-within {
          animation: buttonPulse 1.5s ease-in-out infinite !important;
        }

        .nav-pill.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 220, 150, 0.6);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 250ms ease;
        }

        .cta-button:hover {
          animation: buttonPulse 1.5s ease-in-out infinite !important;
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
        background: 'linear-gradient(90deg, rgba(13, 20, 36, 0.90) 0%, rgba(26, 40, 69, 0.85) 40%, rgba(139, 74, 58, 0.80) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        boxShadow: '0 4px 12px rgba(13, 20, 36, 0.3), inset 0 1px 0 rgba(255, 220, 150, 0.12)'
      }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="flex flex-col items-center">
                {/* Roof with lights SVG */}
                <svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Roof outline */}
                  <path d="M10 25 L70 10 L130 25" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>

                  {/* Holiday lights along the roofline */}
                  {/* Light 1 */}
                  <circle cx="20" cy="22" r="3" fill="#FFD700" className="animate-pulse"/>
                  <line x1="20" y1="22" x2="20" y2="17" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 2 */}
                  <circle cx="35" cy="18" r="3" fill="#FF6B6B" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
                  <line x1="35" y1="18" x2="35" y2="13" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 3 */}
                  <circle cx="50" cy="14" r="3" fill="#4ECDC4" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
                  <line x1="50" y1="14" x2="50" y2="9" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 4 */}
                  <circle cx="70" cy="10" r="3" fill="#FFD700" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
                  <line x1="70" y1="10" x2="70" y2="5" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 5 */}
                  <circle cx="90" cy="14" r="3" fill="#FF6B6B" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
                  <line x1="90" y1="14" x2="90" y2="9" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 6 */}
                  <circle cx="105" cy="18" r="3" fill="#4ECDC4" className="animate-pulse" style={{animationDelay: '1s'}}/>
                  <line x1="105" y1="18" x2="105" y2="13" stroke="#444" strokeWidth="0.5"/>

                  {/* Light 7 */}
                  <circle cx="120" cy="22" r="3" fill="#FFD700" className="animate-pulse" style={{animationDelay: '1.2s'}}/>
                  <line x1="120" y1="22" x2="120" y2="17" stroke="#444" strokeWidth="0.5"/>

                  {/* String connecting the lights */}
                  <path d="M20 17 Q35 12, 50 9 T90 9 Q105 12, 120 17" stroke="#444" strokeWidth="0.5" fill="none" opacity="0.4"/>
                </svg>

                <div className="flex items-center border-b-2 border-[#ffdc96] pb-0.5">
                  <span className="text-xl md:text-2xl font-bold text-white">RVA</span>
                  <span className="text-2xl md:text-3xl font-bold text-[#ffdc96] mx-2">Glow</span>
                  <span className="text-xl md:text-2xl font-bold text-white">Co</span>
                </div>
                <span className="text-xs text-white tracking-widest opacity-90 mt-0.5">HOLIDAY LIGHTS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/"
                onClick={(e) => handleNavigation(e, '/')}
                className={`nav-pill ${isActive('/') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  Home
                </span>
              </Link>
              <Link
                href="/services"
                onClick={(e) => handleNavigation(e, '/services')}
                className={`nav-pill ${isActive('/services') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  Services
                </span>
              </Link>
              <Link
                href="/faq"
                onClick={(e) => handleNavigation(e, '/faq')}
                className={`nav-pill ${isActive('/faq') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  FAQ
                </span>
              </Link>
              <Link
                href="/about"
                onClick={(e) => handleNavigation(e, '/about')}
                className={`nav-pill ${isActive('/about') ? 'active' : ''}`}
              >
                <span className="relative z-10 font-medium text-white">
                  About
                </span>
              </Link>
              <Link
                href="/contact"
                onClick={(e) => handleNavigation(e, '/contact')}
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
                onClick={(e) => handleNavigation(e, '/booking')}
                className="cta-button text-white px-6 py-3 rounded-full font-semibold"
                style={{
                  background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 60%, #a85845 100%)',
                  border: '1.5px solid #ffdc96',
                  boxShadow: '0 0 0 0.5px rgba(255, 220, 150, 0.5), 0 6px 12px rgba(139, 74, 58, 0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
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
                    background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 60%, #a85845 100%)',
                    border: '1.5px solid #ffdc96',
                    boxShadow: '0 0 0 0.5px rgba(255, 220, 150, 0.5), 0 6px 12px rgba(139, 74, 58, 0.3)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
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