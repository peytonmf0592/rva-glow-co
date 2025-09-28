'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Lumi, your holiday lighting assistant! How can I help brighten your day?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Predefined responses for common questions
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Lights/Materials questions
    if (lowerMessage.includes('light') || lowerMessage.includes('bulb') || lowerMessage.includes('c9') || lowerMessage.includes('led')) {
      return "We use professional-grade faceted C9 LED bulbs - the gold standard for holiday lighting! They feature diamond-cut facets that create brilliant sparkles, last 50,000+ hours, save 90% energy vs incandescent, and are 100% commercial grade. We also offer G50 bulbs for a different look. All bulbs are weather-rated and built to last!"
    }

    // Materials/Quality questions
    if (lowerMessage.includes('material') || lowerMessage.includes('wire') || lowerMessage.includes('cord') || lowerMessage.includes('quality')) {
      return "We use only commercial-grade materials: SPT-1 rated outdoor socket cord, heavy-duty zip cord for power runs, professional termination caps (safer than exposed plugs), damage-free ridge clips for peaks, and circle clips that rotate for shingles and gutters. Everything is weatherproof and built to Richmond's weather standards!"
    }

    // Clips/Installation method
    if (lowerMessage.includes('clip') || lowerMessage.includes('attach') || lowerMessage.includes('damage') || lowerMessage.includes('nail')) {
      return "We use specialized clips designed for your roof type - no nails, staples, or permanent attachments! Circle clips rotate to work on both shingles and gutters, and ridge clips protect your peaks. Everything is removable and damage-free. Your roof warranty stays intact!"
    }

    // Colors/Design questions
    if (lowerMessage.includes('color') || lowerMessage.includes('pattern') || lowerMessage.includes('white') || lowerMessage.includes('multi')) {
      return "You can choose from warm white, multicolor, red/green, or custom color combinations! Popular patterns include solid colors or our 3-2 red/green alternating pattern. Note: Blues and greens appear brighter than reds and oranges. We install one color first, then add the second for perfect spacing!"
    }

    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return "Our roofline lighting starts at $7-10 per linear foot for standard installations. Steeper roofs and complex designs vary based on pitch and accessibility. Every quote includes full installation, seasonal maintenance, takedown, and storage options. Want a free consultation for an exact quote?"
    }

    // Lease vs Buy
    if (lowerMessage.includes('lease') || lowerMessage.includes('buy') || lowerMessage.includes('own') || lowerMessage.includes('purchase')) {
      return "Great question! LEASE: Same price yearly with fresh lights and storage included. BUY: Save ~40% in year 2 and beyond (labor only). Most customers choose buying for long-term savings. Both options include installation, service, takedown, and maintenance!"
    }

    // Booking questions
    if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
      return "Ready to light up your holidays? You can book directly through our booking page, or call us at (804) 555-4569. We're booking up fast for this season!"
    }

    // Service area questions
    if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('serve')) {
      return "We proudly serve Richmond and surrounding areas including Henrico, Chesterfield, Midlothian, Short Pump, and Glen Allen! Located outside our primary area? We're willing to travel depending on the distance. Please reach out at (804) 555-4569 and let's see if we can make it work!"
    }

    // Process questions
    if (lowerMessage.includes('process') || lowerMessage.includes('work')) {
      return "It's super easy! 1) You book a free consultation 2) We design your custom display 3) Our team installs everything 4) You enjoy the holidays stress-free 5) We handle takedown in January 6) Optional storage. No ladders, no hassle for you!"
    }

    // Timing/Installation questions
    if (lowerMessage.includes('when') || lowerMessage.includes('long') || lowerMessage.includes('install') || lowerMessage.includes('take')) {
      return "Most installations take 2.5-3 hours for a typical single-story home (150 linear feet). Larger homes take 4-6 hours. We start installations in late October through December 24th. Removal happens in January. Book early for the best dates!"
    }

    // Service/Maintenance questions
    if (lowerMessage.includes('service') || lowerMessage.includes('maintenance') || lowerMessage.includes('repair') || lowerMessage.includes('fix')) {
      return "All packages include complimentary service calls during the season! We respond within 48 hours to replace bulbs, fix weather damage, or adjust timers. No extra charge for standard service calls. We've got you covered!"
    }

    // Safety/Insurance
    if (lowerMessage.includes('insur') || lowerMessage.includes('safe') || lowerMessage.includes('licens')) {
      return "Absolutely! We're fully insured with liability coverage. Our installers are trained in ladder safety, fall protection, and proper electrical work. We use steep assist devices for difficult pitches. Your home and our team are completely protected!"
    }

    // Storage questions
    if (lowerMessage.includes('storage') || lowerMessage.includes('store')) {
      return "Storage is included with lease options and available as an add-on for purchased lights. We keep everything in climate-controlled storage, test lights before the next season, and organize by property. No garage clutter for you!"
    }

    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello there! Ready to make your home the brightest on the block? What questions can I answer about our holiday lighting services?"
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! Is there anything else you'd like to know about RVA Glow Co?"
    }

    // Default response
    return "That's a great question! For the most detailed information, please call us at (804) 555-4569 or visit our FAQ page. I can help with questions about our lights, materials, pricing, installation process, and services!"
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            box-shadow: rgba(255, 193, 7, 0.3) 0 5px 10px 0;
          }
          50% {
            transform: scale(1.3);
            box-shadow: rgba(255, 193, 7, 0.3) 0 15px 20px 0;
          }
          100% {
            transform: scale(1);
            box-shadow: rgba(255, 193, 7, 0.3) 0 5px 10px 0;
          }
        }

        @keyframes colorChange {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        .loader-inner {
          position: relative;
          height: 100px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          animation: colorChange 2s infinite ease-in-out;
          z-index: 999;
        }

        .click-me-text {
          position: absolute;
          bottom: -24px;
          font-size: 11px;
          font-weight: 600;
          color: #1a2845;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          white-space: nowrap;
        }

        .ripple-box {
          position: absolute;
          background: linear-gradient(0deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 220, 150, 0.15) 100%);
          border-radius: 50%;
          border-top: 1px solid rgba(255, 193, 7, 0.6);
          box-shadow: rgba(255, 193, 7, 0.2) 0 5px 10px 0;
          backdrop-filter: blur(3px);
          animation: ripple 2s infinite ease-in-out;
        }

        .ripple-box:nth-child(1) {
          width: 25%;
          aspect-ratio: 1/1;
          z-index: 99;
        }

        .ripple-box:nth-child(2) {
          inset: 30%;
          z-index: 98;
          border-color: rgba(255, 193, 7, 0.5);
          animation-delay: 0.2s;
        }

        .ripple-box:nth-child(3) {
          inset: 20%;
          z-index: 97;
          border-color: rgba(255, 193, 7, 0.4);
          animation-delay: 0.4s;
        }

        .ripple-box:nth-child(4) {
          inset: 10%;
          z-index: 96;
          border-color: rgba(255, 193, 7, 0.3);
          animation-delay: 0.6s;
        }

        .ripple-box:nth-child(5) {
          inset: 0;
          z-index: 95;
          border-color: rgba(255, 193, 7, 0.2);
          animation-delay: 0.8s;
        }

        .chat-window-container {
          position: relative;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.6),
                      0 0 20px rgba(255, 193, 7, 0.4),
                      0 0 40px rgba(255, 193, 7, 0.2);
          overflow: hidden;
        }
      `}</style>

      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        {/* Chat Button with Ripple Effect */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
          aria-label="Open chat"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        >
          <div className="loader-inner">
            <div className="loader-logo">
              <img src="/images/lumi.png" alt="Chat with Lumi" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              <span className="click-me-text">Click Me!</span>
            </div>
            <div className="ripple-box"></div>
            <div className="ripple-box"></div>
            <div className="ripple-box"></div>
            <div className="ripple-box"></div>
            <div className="ripple-box"></div>
          </div>
        </button>
      </div>

      {/* SVG Filter for Electric Border */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 left-6 md:left-auto md:right-6 z-[100] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{
          width: 'auto',
          maxWidth: '380px',
          height: 'min(600px, 80vh)',
          maxHeight: '80vh'
        }}
      >
        <div className="chat-window-container" style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        {/* Header */}
        <div className="text-white rounded-t-2xl p-4 flex items-center justify-between" style={{
          background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
          boxShadow: '0 2px 8px rgba(26, 40, 69, 0.2)'
        }}>
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full flex items-center justify-center w-12 h-12 p-1">
              <img src="/images/lumi.png" alt="Lumi" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Lumi</h3>
              <p className="text-xs text-[#e7f5f6]">Holiday Lighting Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2`}
                style={message.sender === 'user' ? {
                  background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
                  color: 'white'
                } : {
                  background: 'rgba(232, 220, 200, 0.4)',
                  color: '#1a2845'
                }}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none text-gray-800"
              style={{
                border: '1px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            />
            <button
              onClick={handleSendMessage}
              className="text-white rounded-full p-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{
                background: 'linear-gradient(90deg, #1a2845 0%, #8b4a3a 100%)',
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
              aria-label="Send message"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setInputText("What are your prices?")}
              className="text-xs text-[#1a2845] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(232, 220, 200, 0.4)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Pricing
            </button>
            <button
              onClick={() => setInputText("How do I book?")}
              className="text-xs text-[#1a2845] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(232, 220, 200, 0.4)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Book Now
            </button>
            <button
              onClick={() => setInputText("What areas do you serve?")}
              className="text-xs text-[#1a2845] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(232, 220, 200, 0.4)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Service Areas
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}