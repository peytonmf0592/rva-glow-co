'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Script from 'next/script'

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
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false)
  const [lightingOption, setLightingOption] = useState<'roof' | 'full'>('roof')
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)
  const [panorama, setPanorama] = useState<any>(null)
  const [geocoder, setGeocoder] = useState<any>(null)
  const [autocomplete, setAutocomplete] = useState<any>(null)

  // Lead capture form states
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadError, setLeadError] = useState<string | null>(null)

  const streetViewRef = useRef<HTMLDivElement>(null)
  const cropOverlayRef = useRef<HTMLDivElement>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.initMap = initMap
  }, [])

  // Handle mouse events for slider
  useEffect(() => {
    const handleMouseUp = () => setIsDraggingSlider(false)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingSlider) return
      // Find the slider container
      const sliderContainer = document.getElementById('before-after-container')
      if (!sliderContainer) return

      const rect = sliderContainer.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }

    if (isDraggingSlider) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingSlider])

  const initMap = useCallback(() => {
    if (window.google && streetViewRef.current) {
      console.log('Initializing Google Maps...')
      console.log('User Agent:', navigator.userAgent)
      console.log('Is Mobile:', /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

      const service = new window.google.maps.StreetViewService()
      const newGeocoder = new window.google.maps.Geocoder()
      setGeocoder(newGeocoder)

      // Initialize with a default location (Richmond, VA - Monument Ave with known Street View)
      const defaultLocation = { lat: 37.5538, lng: -77.4603 }

      // First check if Street View is available at this location
      service.getPanorama({ location: defaultLocation, radius: 200 }, (data: any, status: any) => {
        if (status === window.google.maps.StreetViewStatus.OK && streetViewRef.current) {
          const newPanorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
              position: data.location.latLng,
              pov: { heading: 90, pitch: 0 },
              zoom: 1,
              addressControl: false,
              linksControl: true,
              panControl: true,
              enableCloseButton: false,
              fullscreenControl: false,
              zoomControl: true,
              motionTracking: false,
              motionTrackingControl: false,
              visible: true
            }
          )
          setPanorama(newPanorama)
          console.log('Street View initialized successfully at:', data.location.latLng.toString())
        } else {
          console.error('Street View data not found, trying fallback location...')
          // Fallback to Times Square which definitely has Street View
          const fallbackLocation = { lat: 40.758, lng: -73.9855 }
          const fallbackPanorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
              position: fallbackLocation,
              pov: { heading: 90, pitch: 0 },
              zoom: 1,
              visible: true
            }
          )
          setPanorama(fallbackPanorama)
        }
      })

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

          // Log for debugging
          console.log('Searching for Street View at:', place.formatted_address)
          console.log('Coordinates:', location.lat(), location.lng())

          // Destroy and recreate the panorama for the new location
          if (streetViewRef.current) {
            // Clear the current panorama
            streetViewRef.current.innerHTML = ''

            // Create a completely new panorama at the new location
            const newPanorama = new window.google.maps.StreetViewPanorama(
              streetViewRef.current,
              {
                position: location,
                pov: { heading: 0, pitch: 10 },
                zoom: 0.5,
                addressControl: false,
                linksControl: true,
                panControl: true,
                enableCloseButton: false,
                fullscreenControl: false,
                zoomControl: true,
                motionTracking: false,
                motionTrackingControl: false,
                visible: true
              }
            )

            setPanorama(newPanorama)

            // Give it a moment to initialize, then check if it loaded
            setTimeout(() => {
              const panoLocation = newPanorama.getPosition()
              if (panoLocation) {
                console.log('New panorama created successfully at:', panoLocation.toString())
                setStep(2)
                setIsLoading(false)
              } else {
                console.log('Panorama creation failed, trying service lookup...')
                // Fall back to service lookup
                lookupStreetView(location)
              }
            }, 500)

            return
          }

          // Fallback to service lookup
          const lookupStreetView = (loc: any) => {
            // Create a new StreetViewService for this search
            const searchService = new window.google.maps.StreetViewService()

            // For mobile, try with preference for outdoor panoramas
            const searchOptions = {
              location: loc,
              radius: 50,
              preference: 'nearest' as any,
              source: 'outdoor' as any
            }

            searchService.getPanorama(
            searchOptions,
            (data: any, status: any) => {
              console.log('First search status:', status)

              if (status === 'OK' && panorama) {
                console.log('Street View found at first attempt')
                console.log('Setting panorama to:', data.location.latLng.toString())

                // Force the panorama to update
                panorama.setVisible(false)
                setTimeout(() => {
                  panorama.setPosition(data.location.latLng)
                  panorama.setPov({
                    heading: 0,
                    pitch: 10  // Slight upward tilt to better frame houses
                  })
                  panorama.setZoom(0.5)  // Zoom out to show more of the house
                  panorama.setVisible(true)
                  setStep(2)
                  setIsLoading(false)
                }, 100)
              } else {
                // Try a wider radius without source restriction
                console.log('First search failed, trying wider radius...')
                searchService.getPanorama(
                  {
                    location: location,
                    radius: 200,
                    preference: 'nearest' as any
                  },
                  (data2: any, status2: any) => {
                    console.log('Second search status:', status2)

                    if (status2 === 'OK' && panorama) {
                      console.log('Street View found at second attempt')
                      console.log('Setting panorama to:', data2.location.latLng.toString())

                      // Force the panorama to update
                      panorama.setVisible(false)
                      setTimeout(() => {
                        panorama.setPosition(data2.location.latLng)
                        panorama.setPov({
                          heading: 0,
                          pitch: 10
                        })
                        panorama.setZoom(0.5)
                        panorama.setVisible(true)
                        setStep(2)
                      }, 100)
                    } else {
                      // Final attempt for mobile - skip to step 2 anyway on mobile devices
                      console.log('Both searches failed, checking if mobile...')
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

                      if (isMobile) {
                        console.log('Mobile device detected - skipping to quote form')
                        // On mobile, skip directly to the quote form
                        setStep(4)
                        // Set a flag to show mobile quote form
                        setOriginalImage('mobile-skip')
                        setRenderedImage('mobile-skip')
                        setIsQuotaExceeded(true) // Use the quota exceeded flow which shows the form
                      } else if (panorama) {
                        // Desktop fallback - try direct positioning
                        console.log('Desktop - trying direct positioning...')
                        panorama.setPosition(location)
                        // Check if panorama loaded after setting position
                        setTimeout(() => {
                          const panoLocation = panorama.getPosition()
                          if (panoLocation) {
                            console.log('Direct positioning succeeded')
                            setStep(2)
                          } else {
                            console.log('Direct positioning failed')
                            setError('Street View is not available for this address. This often happens with new developments or rural areas. Please try a nearby main street address, or contact us directly for a custom quote at (804) 518-6955.')
                          }
                        }, 1000)
                      } else {
                        setError('Street View is not available for this address. This often happens with new developments or rural areas. Please try a nearby main street address, or contact us directly for a custom quote at (804) 518-6955.')
                      }
                    }
                    setIsLoading(false)
                  }
                )
              }
            }
          )
          }

          // If initial creation failed, try lookup
          lookupStreetView(location)
        })

        setAutocomplete(newAutocomplete)
      }
    }
  }, [])

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

    e.preventDefault()
    e.stopPropagation()

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCropping || !cropOverlayRef.current) return

    e.preventDefault()
    e.stopPropagation()

    const touch = e.touches[0]
    const rect = cropOverlayRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    setCropStart({ x, y })
    setCropEnd({ x, y })
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !cropOverlayRef.current) return

    e.preventDefault()
    e.stopPropagation()

    const touch = e.touches[0]
    const rect = cropOverlayRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(touch.clientY - rect.top, rect.height))

    setCropEnd({ x, y })
  }

  const handleTouchEnd = (e?: React.TouchEvent) => {
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
    setStep(3)

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

      // Fetch the Street View image
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
        const errorMessage = data.error || 'Failed to generate preview'
        throw new Error(errorMessage)
      }

      // Check if quota was exceeded
      if (data.quotaExceeded) {
        setIsQuotaExceeded(true)
      }

      setRenderedImage(data.renderedImage)
      setStep(4)

    } catch (err) {
      if (err instanceof Error) {
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

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!leadName || !leadPhone || !leadEmail) {
      setLeadError('Please fill in all fields')
      return
    }

    setIsSubmittingLead(true)
    setLeadError(null)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          email: leadEmail,
          address: address,
          lightingOption: lightingOption,
          source: 'holiday-preview-tool',
          message: `Interested in ${lightingOption === 'roof' ? 'Roofline Only' : 'Complete'} package after using preview tool`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit quote request')
      }

      setLeadSubmitted(true)
    } catch (error) {
      setLeadError('Failed to submit your request. Please try again.')
      console.error('Lead submission error:', error)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const resetPreview = () => {
    setAddress('')
    setOriginalImage(null)
    setRenderedImage(null)
    setError(null)
    setStep(1)
    setIsQuotaExceeded(false)
    setSliderPosition(50)
    setIsLightboxOpen(false)
    setIsDraggingSlider(false)
    setIsCropping(false)
    setCropStart({ x: 0, y: 0 })
    setCropEnd({ x: 0, y: 0 })
    setLeadName('')
    setLeadPhone('')
    setLeadEmail('')
    setLeadSubmitted(false)
    setLeadError(null)
  }

  const handleSliderMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSlider) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [isDraggingSlider])

  const handleSliderStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingSlider(true)
    handleSliderMove(e)
  }, [handleSliderMove])

  const handleSliderEnd = useCallback(() => {
    setIsDraggingSlider(false)
  }, [])

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
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap&loading=async`}
        strategy="lazyOnload"
      />

      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">
                See Your Home in Holiday Lights
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Preview how professional holiday lighting will transform your home
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-6 overflow-x-auto">
            <div className="flex items-center space-x-2 md:space-x-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                      step >= num || (step === 2 && isCropping && num === 2)
                        ? 'bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`w-8 md:w-12 h-1 mx-1 md:mx-2 ${
                        step > num ? 'bg-[#1a2845]' : 'bg-gray-200'
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
              {step === 4 && !isQuotaExceeded && "Step 4: Your home with professional holiday lights!"}
              {step === 4 && isQuotaExceeded && "Step 4: Preview your home with professional holiday lights!"}
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
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#1a2845] transition-all"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#1a2845] border-t-transparent"></div>
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
                <div className="bg-[#1a2845]/90 text-white px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                  <p className="text-xs font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1.5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2z" />
                    </svg>
                    <span className="hidden sm:inline">Drag to adjust • Zoom to frame your house • Click and hold to pan</span>
                    <span className="sm:hidden">Drag • Zoom • Pan to frame house</span>
                  </p>
                </div>
              </div>
            )}

            {/* Helper message when cropping */}
            {step === 2 && isCropping && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-[#8b4a3a]/90 text-white px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                  <p className="text-xs font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1.5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5l16 16" />
                    </svg>
                    <span className="hidden sm:inline">Click and drag to draw a box around your house</span>
                    <span className="sm:hidden">Drag to draw box around house</span>
                  </p>
                </div>
              </div>
            )}

            <div
              ref={streetViewRef}
              className={`w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl ${
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ pointerEvents: 'auto', touchAction: 'none' }}
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
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-[#1a2845]"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-[#1a2845]"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-[#1a2845]"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-[#1a2845]"></div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {step === 2 && !isCropping && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-11/12 max-w-sm">
                <div
                  className="rounded-xl p-2.5 md:p-3 shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <p className="text-xs text-white mb-2 text-center font-semibold drop-shadow-md">
                    Frame your house, then click below
                  </p>
                  <button
                    onClick={startCropping}
                    className="w-full px-5 py-2.5 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-bold text-sm hover:shadow-xl hover:scale-105 transition-all duration-200 animate-pulse"
                  >
                    Start Cropping
                  </button>
                </div>
              </div>
            )}

            {step === 2 && isCropping && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-md">
                {/* Lighting options selector - shows ONLY when selection is made AND not dragging */}
                {!isDragging && cropEnd.x !== cropStart.x && cropEnd.y !== cropStart.y && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-2xl mb-3 md:mb-4">
                    <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 text-center">Choose your lighting package:</p>
                    <div className="flex gap-2 md:gap-3 mb-3 md:mb-4">
                      <button
                        onClick={() => setLightingOption('roof')}
                        className={`flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all ${
                          lightingOption === 'roof'
                            ? 'border-[#1a2845] bg-[#e8dcc8] text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold text-xs md:text-base">Roofline Only</div>
                        <div className="text-xs mt-1 hidden md:block">Classic & Elegant</div>
                      </button>
                      <button
                        onClick={() => setLightingOption('full')}
                        className={`flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all ${
                          lightingOption === 'full'
                            ? 'border-[#8b4a3a] bg-[#e8dcc8] text-amber-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold text-xs md:text-base">Roofline + Landscape</div>
                        <div className="text-xs mt-1 hidden md:block">Complete Package</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-2 md:space-x-4">
                  {/* Show cancel button always when cropping */}
                  <button
                    onClick={cancelCropping}
                    className="px-4 md:px-6 py-2 md:py-3 bg-red-500 text-white rounded-full text-sm md:text-base font-semibold hover:bg-red-600 transition-all"
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
                        className="px-4 md:px-6 py-2 md:py-3 bg-gray-500 text-white rounded-full text-sm md:text-base font-semibold hover:bg-gray-600 transition-all"
                      >
                        Redraw
                      </button>
                      <button
                        onClick={captureAndRender}
                        className="px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full text-sm md:text-base font-semibold hover:shadow-lg transition-all"
                      >
                        Generate
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
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1a2845] border-t-transparent mb-4"></div>
              <p className="text-lg text-gray-600">Creating your holiday preview...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-15 seconds</p>
            </div>
          )}

          {/* Results Display - Before/After Slider */}
          {step === 4 && originalImage && renderedImage && (
            <div className="mt-12">
              {/* Show mobile message instead of slider if on mobile */}
              {originalImage === 'mobile-skip' ? (
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Address Confirmed!
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>{address}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      Our designers will create a custom holiday lighting plan specifically for your home
                    </p>
                  </div>
                </div>
              ) : (
              /* Original Before/After Slider */
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] bg-clip-text text-transparent">
                  Your Holiday Lighting Transformation
                </h3>
                <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
                  <span className="hidden md:inline">Drag the slider to see the before and after • Click the after image to view full size</span>
                  <span className="md:hidden">Swipe the slider to compare • Tap to view full size</span>
                </p>

                <div
                  id="before-after-container"
                  className="relative overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none"
                  style={{ aspectRatio: 'auto' }}
                  onMouseDown={handleSliderStart}
                  onMouseMove={handleSliderMove}
                  onMouseUp={handleSliderEnd}
                  onTouchStart={(e) => {
                    const touch = e.touches[0]
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = touch.clientX - rect.left
                    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                    setSliderPosition(percentage)
                    setIsDraggingSlider(true)
                  }}
                  onTouchMove={(e) => {
                    if (!isDraggingSlider) return
                    e.preventDefault()
                    const touch = e.touches[0]
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = touch.clientX - rect.left
                    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                    setSliderPosition(percentage)
                  }}
                  onTouchEnd={() => setIsDraggingSlider(false)}
                >
                  {/* After Image (Background) */}
                  <div className="relative">
                    <img
                      src={renderedImage}
                      alt="Home with holiday lights"
                      className="w-full h-auto block"
                      onClick={() => setIsLightboxOpen(true)}
                      style={{ cursor: 'zoom-in' }}
                    />

                    {/* Before Image (Clipped) */}
                    <div
                      className="absolute top-0 left-0 w-full h-full overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <img
                        src={originalImage}
                        alt="Original home"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Slider Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
                      style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] rounded-full"></div>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Quota Exceeded Notice - Show different message for mobile */}
              {isQuotaExceeded && originalImage !== 'mobile-skip' && (
                <div className="mt-8 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#e8dcc8] to-orange-50 border-l-4 border-amber-400 rounded-lg p-6 shadow-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-semibold text-amber-800">AI Preview Temporarily Unavailable</h4>
                        <p className="text-amber-700 mt-1">
                          Our AI image generation service has reached its daily quota. The image above shows your home as captured -
                          our professional designers will create a custom lighting design just for you!
                          <span className="font-semibold"> Contact us below for a personalized consultation and free quote.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead Capture Form - NEW */}
              {!leadSubmitted ? (
                <div className="mt-12 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-br from-[#e8dcc8] to-[#e8dcc8] rounded-xl p-8 shadow-lg">
                    <h4 className="text-2xl font-bold text-center mb-2 text-gray-800">
                      {isQuotaExceeded ? "Get Your Custom Design!" : "Love What You See?"}
                    </h4>
                    <p className="text-center text-gray-600 mb-6">
                      {isQuotaExceeded
                        ? "Our professional designers will create a custom holiday lighting plan specifically for your home!"
                        : "Get a free quote for this exact lighting design!"
                      }
                    </p>

                    <form onSubmit={submitLead} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1a2845]"
                          placeholder="John Smith"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1a2845]"
                          placeholder="(804) 555-0123"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1a2845]"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      {leadError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 text-sm">{leadError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="w-full py-4 bg-gradient-to-r from-[#1a2845] to-[#8b4a3a] text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingLead ? 'Sending...' : 'Get My Free Quote'}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      We'll contact you within 24 hours with your personalized quote
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-12 max-w-2xl mx-auto">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      Quote Request Received!
                    </h4>
                    <p className="text-gray-600 mb-4">
                      We'll contact you within 24 hours to schedule your free consultation
                    </p>
                    <p className="text-sm text-gray-500">
                      Selected Package: {lightingOption === 'roof' ? 'Roofline Only' : 'Complete (Roofline + Landscape)'}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="text-center mt-8 space-y-4">
                {!leadSubmitted && (
                  <a
                    href="/booking"
                    className="inline-block px-10 py-4 bg-gray-200 text-gray-700 rounded-full text-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Or Book Installation Now
                  </a>
                )}
                <button
                  onClick={resetPreview}
                  className="block mx-auto text-gray-600 hover:text-gray-800 underline"
                >
                  Try Another Address
                </button>
              </div>
            </div>
          )}

          {/* Lightbox */}
          {isLightboxOpen && renderedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div className="relative max-w-full max-h-full">
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img
                  src={renderedImage}
                  alt="Home with holiday lights - Full size"
                  className="max-w-full max-h-full rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                  Your Home with Professional Holiday Lights
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-amber-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-amber-800 mb-1">
                    {error.includes('mobile') ? 'Mobile Preview Notice' : 'Address Not Available for Preview'}
                  </h3>
                  <p className="text-amber-700">{error}</p>
                  {error.includes('mobile') && step === 2 ? (
                    <div className="mt-4">
                      <p className="text-sm text-amber-600 mb-3">You can continue with the preview tool using the default view.</p>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={resetPreview}
                        className="px-6 py-2 bg-[#1a2845] text-white rounded-full font-semibold hover:bg-[#2a3855] transition-all"
                      >
                        Try Another Address
                      </button>
                      <a
                        href="/booking"
                        className="px-6 py-2 bg-white border-2 border-[#8b4a3a] text-[#8b4a3a] rounded-full font-semibold hover:bg-[#8b4a3a] hover:text-white transition-all text-center"
                      >
                        Book Consultation Instead
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}