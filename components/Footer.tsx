import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">
              RVA Glow Co
            </h3>
            <p className="text-gray-300 text-sm hidden md:block">
              Bringing holiday magic to Richmond homes since 2024. Professional, insured, and dedicated to making your holidays shine.
            </p>
            <p className="text-gray-300 text-xs md:hidden">
              Professional holiday lighting in Richmond, VA
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-base">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Book Installation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 text-[#FFD700]">Service Areas</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 md:block md:space-y-2 text-gray-300 text-xs md:text-base">
              <div>📍 Richmond</div>
              <div>📍 Henrico</div>
              <div>📍 Chesterfield</div>
              <div>📍 Midlothian</div>
              <div>📍 Short Pump</div>
              <div>📍 Glen Allen</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 text-[#FFD700]">Contact</h4>
            <div className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-base">
              <p>
                <a href="tel:8045186955" className="hover:text-[#FFD700] transition-colors">
                  (804) 518-6955
                </a>
              </p>
              <p>
                <a href="mailto:getlit@rvaglowco.com" className="hover:text-[#FFD700] transition-colors break-all">
                  getlit@rvaglowco.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="mb-2 md:mb-3 text-xs md:text-base">&copy; 2024 RVA Glow Co. All rights reserved.</p>
          <div className="flex justify-center space-x-4 md:space-x-6 text-xs md:text-sm">
            <Link href="/privacy" className="hover:text-[#FFD700] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FFD700] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}