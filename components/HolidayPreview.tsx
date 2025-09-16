'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import html2canvas from 'html2canvas'
import Script from 'next/script'
import HolidayLightsOverlay from './HolidayLightsOverlay'

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function HolidayPreview() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 })
  const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [renderedImage, setRenderedImage] = useState<string | null>(null)
  const [lightingDescription, setLightingDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [lightingOption, setLightingOption] = useState<'roof' | 'full'>('roof')
  const [panorama, setPanorama] = useState<any>(null)
  const [geocoder, setGeocoder] = useState<any>(null)
  const [autocomplete, setAutocomplete] = useState<any>(null)

  const streetViewRef = useRef<HTMLDivElement>(null)
  const cropOverlayRef = useRef<HTMLDivElement>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.initMap = initMap
  }, [])

  const initMap = useCallback(() => {
    if (window.google && streetViewRef.current) {
      const service = new window.google.maps.StreetViewService()
      const newGeocoder = new window.google.maps.Geocoder()
      setGeocoder(newGeocoder)

      // Initialize with a default location (Richmond, VA)
      const defaultLocation = { lat: 37.5407, lng: -77.4360 }

      const newPanorama = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: defaultLocation,
          pov: { heading: 165, pitch: 10 },
          zoom: 0.8,
          addressControl: false,
          linksControl: false,
          panControl: true,
          enableCloseButton: false,
          fullscreenControl: false,
          zoomControl: true,
          motionTracking: false,
          motionTrackingControl: false
        }
      )

      setPanorama(newPanorama)

      // Initialize Places Autocomplete on the address input
      if (addressInputRef.current) {
        const newAutocomplete = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'us' },
            fields: ['geometry', 'formatted_address', 'place_id']
          }
        )

        // Listen for place selection
        newAutocomplete.addListener('place_changed', () => {
          const place = newAutocomplete.getPlace()

          if (!place.geometry || !place.geometry.location) {
            setError('Please select a valid address from the dropdown')
            return
          }

          setAddress(place.formatted_address || '')
          setIsLoading(true)
          setError(null)

          // Get Street View data for the selected location
          const location = place.geometry.location

          service.getPanorama(
            {
              location: location,
              radius: 50
            },
            (data: any, status: any) => {
              if (status === 'OK') {
                newPanorama.setPosition(data.location.latLng)
                newPanorama.setPov({
                  heading: 0,
                  pitch: 10  // Slight upward tilt to better frame houses
                })
                newPanorama.setZoom(0.5)  // Zoom out to show more of the house
                setStep(2)
              } else {
                setError('No Street View coverage at this location. Try a different address.')
              }
              setIsLoading(false)
            }
          )
        })

        setAutocomplete(newAutocomplete)
      }
    }
  }, [])

  // Simplified - autocomplete now handles address search
  const searchAddress = async () => {
    // This function is kept for potential manual fallback
    // but primary functionality is now handled by autocomplete
  }

  const startCropping = () => {
    setIsCropping(true)
    // Disable Street View controls during cropping
    if (panorama) {
      panorama.setOptions({
        panControl: false,
        zoomControl: false,
        clickToGo: false,
        disableDoubleClickZoom: true,
        scrollwheel: false
      })
    }
  }

  const cancelCropping = () => {
    setIsCropping(false)
    setCropStart({ x: 0, y: 0 })
    setCropEnd({ x: 0, y: 0 })
    // Re-enable Street View controls
    if (panorama) {
      panorama.setOptions({
        panControl: true,
        zoomControl: true,
        clickToGo: true,
        disableDoubleClickZoom: false,
        scrollwheel: true
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isCropping || !cropOverlayRef.current) return

    e.preventDefault() // Prevent default behavior
    e.stopPropagation() // Stop event from bubbling to Street View

    const rect = cropOverlayRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCropStart({ x, y })
    setCropEnd({ x, y })
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cropOverlayRef.current) return

    e.preventDefault()
    e.stopPropagation()

    const rect = cropOverlayRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

    setCropEnd({ x, y })
  }

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (!isDragging) return

    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setIsDragging(false)
  }

  const captureAndRender = async () => {
    if (!panorama || !isCropping) return

    setIsLoading(true)
    setError(null)
    setStep(3)  // Changed from 4 to 3 since we combined steps

    try {
      // Get the current Street View position and POV
      const position = panorama.getPosition()
      const pov = panorama.getPov()
      const zoom = panorama.getZoom()

      // Calculate field of view based on zoom - wider view for better capture
      const fov = zoom === 0 ? 120 : zoom === 1 ? 90 : zoom === 2 ? 60 : 45

      // Use Google Static Street View API to get the full image
      const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?` +
        `size=640x640` +
        `&location=${position.lat()},${position.lng()}` +
        `&heading=${pov.heading}` +
        `&pitch=${pov.pitch}` +
        `&fov=${fov}` +
        `&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

      // Simplified approach - just use the full Street View image
      // Since cropping is complex with CORS, we'll send the full view
      const response = await fetch(streetViewUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch Street View image')
      }

      const blob = await response.blob()

      // Convert blob to data URL for display
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result as string)
        }
        reader.readAsDataURL(blob)
      })

      // Set the original image
      setOriginalImage(dataUrl)

      // Create FormData and send to API
      const formData = new FormData()
      formData.append('image', blob, 'house-screenshot.png')
      formData.append('lightingOption', lightingOption)

      // Send to API for rendering
      const apiResponse = await fetch('/api/render-preview', {
        method: 'POST',
        body: formData
      })

      const data = await apiResponse.json()

      if (!apiResponse.ok) {
        // Use the error message from the API if available
        const errorMessage = data.error || 'Failed to generate preview'
        throw new Error(errorMessage)
      }
      setRenderedImage(data.renderedImage)

      // Store the AI's lighting description if available
      if (data.description) {
        setLightingDescription(data.description)
      }

      setStep(4)  // Changed from 5 to 4

    } catch (err) {
      // Show the actual error message to help users understand what went wrong
      if (err instanceof Error) {
        // Check for specific error types
        if (err.message.includes('quota')) {
          setError('AI service is busy. Please wait 30 seconds and try again.')
        } else if (err.message.includes('API key')) {
          setError('Configuration error. Please contact support.')
        } else {
          setError(err.message || 'We couldn\'t generate your preview. Please try again.')
        }
      } else {
        setError('We couldn\'t generate your preview. Please try again.')
      }
      console.error('Render error:', err)
    } finally {
      setIsLoading(false)
      setIsCropping(false)
      // Re-enable Street View controls after capture
      if (panorama) {
        panorama.setOptions({
          panControl: true,
          zoomControl: true,
          clickToGo: true,
          disableDoubleClickZoom: false,
          scrollwheel: true
        })
      }
    }
  }

  const resetPreview = () => {
    setAddress('')
    setOriginalImage(null)
    setRenderedImage(null)
    setLightingDescription(null)
    setError(null)
    setStep(1)
    setIsCropping(false)
    setCropStart({ x: 0, y: 0 })
    setCropEnd({ x: 0, y: 0 })
  }

  const getCropStyle = () => {
    const minX = Math.min(cropStart.x, cropEnd.x)
    const minY = Math.min(cropStart.y, cropEnd.y)
    const width = Math.abs(cropEnd.x - cropStart.x)
    const height = Math.abs(cropEnd.y - cropStart.y)

    return {
      left: `${minX}px`,
      top: `${minY}px`,
      width: `${width}px`,
      height: `${height}px`
    }
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
        strategy="lazyOnload"
      />

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                See Your Home in Holiday Lights
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Preview how professional holiday lighting will transform your home
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= num || (step === 2 && isCropping && num === 2)
                        ? 'bg-gradient-to-r from-blue-500 to-amber-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        step > num ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
              {step === 1 && "Step 1: Enter your home address"}
              {step === 2 && !isCropping && "Step 2: Adjust the view and crop your home"}
              {step === 2 && isCropping && "Step 2: Draw a box around your house"}
              {step === 3 && "Step 3: Generating your holiday preview..."}
              {step === 4 && "Step 4: Your home with professional holiday lights!"}
            </p>
          </div>

          {/* Address Input */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  ref={addressInputRef}
                  type="text"
                  placeholder="Start typing your home address..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 transition-all"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Select an address from the dropdown to continue
              </p>
            </div>
          )}

          {/* Street View Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Helper message for step 2 */}
            {step === 2 && !isCropping && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-blue-500/90 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg">
                  <p className="text-sm font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2z" />
                    </svg>
                    Drag to adjust • Zoom to frame your house • Click and hold to pan
                  </p>
                </div>
              </div>
            )}

            {/* Helper message when cropping */}
            {step === 2 && isCropping && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-amber-500/90 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg">
                  <p className="text-sm font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5l16 16" />
                    </svg>
                    Click and drag to draw a box around your house
                  </p>
                </div>
              </div>
            )}

            <div
              ref={streetViewRef}
              className={`w-full h-[600px] rounded-xl overflow-hidden shadow-2xl ${
                step === 1 ? 'opacity-50' : ''
              }`}
            />

            {/* Crop Overlay */}
            {isCropping && (
              <div
                ref={cropOverlayRef}
                className="absolute inset-0 cursor-crosshair z-20"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ pointerEvents: 'auto' }}
              >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Crop selection box */}
                {(isDragging || (cropEnd.x !== cropStart.x && cropEnd.y !== cropStart.y)) && (
                  <div
                    className="absolute border-2 border-white bg-transparent pointer-events-none"
                    style={{
                      ...getCropStyle(),
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.5)'
                    }}
                  >
                    {/* Corner handles for visual feedback */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-blue-500"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-blue-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-blue-500"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-blue-500"></div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {step === 2 && !isCropping && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    Frame your house perfectly, then click below
                  </p>
                  <button
                    onClick={startCropping}
                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-amber-500 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200 animate-pulse"
                  >
                    Start Cropping →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && isCropping && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                {/* Lighting options selector - shows ONLY when selection is made AND not dragging */}
                {!isDragging && cropEnd.x !== cropStart.x && cropEnd.y !== cropStart.y && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Choose your lighting package:</p>
                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={() => setLightingOption('roof')}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                          lightingOption === 'roof'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">Roofline Only</div>
                        <div className="text-xs mt-1">Classic & Elegant</div>
                      </button>
                      <button
                        onClick={() => setLightingOption('full')}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                          lightingOption === 'full'
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">Roofline + Landscape</div>
                        <div className="text-xs mt-1">Complete Package</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-4">
                  {/* Show cancel button always when cropping */}
                  <button
                    onClick={cancelCropping}
                    className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>

                  {/* Show these buttons only after drawing a selection AND not dragging */}
                  {!isDragging && cropEnd.x !== cropStart.x && cropEnd.y !== cropStart.y && (
                    <>
                      <button
                        onClick={() => {
                          setCropStart({ x: 0, y: 0 })
                          setCropEnd({ x: 0, y: 0 })
                        }}
                        className="px-6 py-3 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-all"
                      >
                        Redraw
                      </button>
                      <button
                        onClick={captureAndRender}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-amber-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                      >
                        Generate Preview
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Loading Spinner */}
          {isLoading && step === 3 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-lg text-gray-600">Creating your holiday preview...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-15 seconds</p>
            </div>
          )}

          {/* Results Display */}
          {step === 4 && originalImage && renderedImage && (
            <div className="mt-12">
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-center text-gray-800">Your Home Today</h3>
                  <img
                    src={originalImage}
                    alt="Original home"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                    {lightingOption === 'roof' ? 'Roofline Package' : 'Complete Package'}
                  </h3>
                  <div className="w-full rounded-xl shadow-lg overflow-hidden">
                    <HolidayLightsOverlay
                      imageUrl={originalImage}
                      lightingOption={lightingOption}
                    />
                  </div>
                </div>
              </div>

              {/* Display AI's lighting plan if available */}
              {lightingDescription && (
                <div className="mt-8 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-800 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Professional Lighting Plan by AI
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lightingOption === 'roof'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {lightingOption === 'roof' ? 'Roofline Only' : 'Roofline + Landscape'}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                      {lightingDescription}
                    </div>
                    <div className="mt-4 p-4 bg-amber-100 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> This AI analysis identifies exactly where holiday lights would be installed on your home. Our professional installers use this plan to create your perfect display.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-8 space-y-4">
                <a
                  href="/booking"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-amber-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transform transition-all"
                >
                  Book This Installation →
                </a>
                <button
                  onClick={resetPreview}
                  className="block mx-auto text-gray-600 hover:text-gray-800 underline"
                >
                  Try Another Address
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}