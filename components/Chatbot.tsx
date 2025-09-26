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

    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return "Our pricing ranges from $8-$15 per linear foot, depending on the height and steepness of your roofline. Some parts of your house may cost more than others due to accessibility challenges. Steeper roofs and higher peaks require specialized equipment and additional safety measures. Would you like a free consultation to get an exact quote for your home?"
    }

    // Booking questions
    if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
      return "Ready to light up your holidays? 🎄 You can book directly through our booking page, or call us at (804) 555-GLOW. We're booking up fast for this season!"
    }

    // Service area questions
    if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return "We proudly serve Richmond and surrounding areas including Henrico, Chesterfield, Midlothian, Short Pump, and Glen Allen! Is your home in one of these areas?"
    }

    // Process questions
    if (lowerMessage.includes('how') || lowerMessage.includes('process') || lowerMessage.includes('work')) {
      return "It's super easy! 1) You book a consultation 2) We design your custom display 3) Our team installs everything 4) You enjoy the holidays 5) We handle the takedown in January. No ladders for you!"
    }

    // Timing questions
    if (lowerMessage.includes('when') || lowerMessage.includes('long') || lowerMessage.includes('time')) {
      return "Most installations take 2-4 hours depending on your home size. We typically start installations in early November and remove lights in January. Book early for the best dates!"
    }

    // Safety/Insurance
    if (lowerMessage.includes('insur') || lowerMessage.includes('safe') || lowerMessage.includes('licens')) {
      return "Absolutely! We're fully insured. Our team is trained in ladder safety and electrical work. Your home and our team are completely protected."
    }

    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello there! 👋 Ready to make your home the brightest on the block? What questions can I answer about our holiday lighting services?"
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! 🌟 Is there anything else you'd like to know about RVA Glow Co?"
    }

    // Default response
    return "That's a great question! For the most accurate information, please call us at (804) 555-GLOW or visit our FAQ page. I'm still learning, but I'm here to help with basic questions about our services!"
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
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .chat-button-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFD700;
          border-radius: 50%;
          animation: sparkle 2s ease-in-out infinite;
        }

        .chat-button-sparkle:nth-child(1) {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .chat-button-sparkle:nth-child(2) {
          top: 20%;
          right: 15%;
          animation-delay: 0.4s;
        }

        .chat-button-sparkle:nth-child(3) {
          bottom: 15%;
          left: 20%;
          animation-delay: 0.8s;
        }

        .chat-button-sparkle:nth-child(4) {
          bottom: 20%;
          right: 10%;
          animation-delay: 1.2s;
        }

        .chat-button-sparkle:nth-child(5) {
          top: 50%;
          left: 5%;
          animation-delay: 1.6s;
        }

        .chat-button-shine {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 215, 0, 0.3) 50%,
            transparent 60%
          );
          background-size: 200% 200%;
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] bg-gradient-to-r from-[#2F7E80] to-[#EB834F] text-white rounded-full p-4 shadow-2xl hover:scale-110 transform transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="chat-button-shine" />
          <div className="chat-button-sparkle"></div>
          <div className="chat-button-sparkle"></div>
          <div className="chat-button-sparkle"></div>
          <div className="chat-button-sparkle"></div>
          <div className="chat-button-sparkle"></div>
          <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.9.49.49-2.9-.15-.28C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="16" cy="12" r="1.5"/>
            <circle cx="8" cy="12" r="1.5"/>
          </svg>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-[100] rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{
          width: '380px',
          height: '600px',
          maxHeight: '80vh',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        {/* Header */}
        <div className="text-white rounded-t-2xl p-4 flex items-center justify-between" style={{
          background: 'linear-gradient(90deg, #2F7E80 0%, #EB834F 100%)',
          boxShadow: '0 2px 8px rgba(47, 126, 128, 0.2)'
        }}>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2 flex items-center justify-center">
              <span className="text-lg font-bold">L</span>
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
                  background: 'linear-gradient(90deg, #2F7E80 0%, #EB834F 100%)',
                  color: 'white'
                } : {
                  background: 'rgba(174, 231, 231, 0.3)',
                  color: '#3d4547'
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
                background: 'linear-gradient(90deg, #2F7E80 0%, #EB834F 100%)',
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
              className="text-xs text-[#3d4547] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(174, 231, 231, 0.3)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Pricing
            </button>
            <button
              onClick={() => setInputText("How do I book?")}
              className="text-xs text-[#3d4547] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(174, 231, 231, 0.3)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Book Now
            </button>
            <button
              onClick={() => setInputText("What areas do you serve?")}
              className="text-xs text-[#3d4547] px-3 py-1 rounded-full transition-colors"
              style={{
                background: 'rgba(174, 231, 231, 0.3)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              Service Areas
            </button>
          </div>
        </div>
      </div>
    </>
  )
}