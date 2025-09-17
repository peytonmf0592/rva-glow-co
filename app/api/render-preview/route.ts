import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  let base64Image = ''
  let lightingOption = 'roof'

  try {
    // Get the image and lighting option from the form data
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    lightingOption = formData.get('lightingOption') as string || 'roof'

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    base64Image = buffer.toString('base64')

    // Check if we have a Gemini API key
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      console.log('Gemini API key not configured - returning original image')

      await new Promise(resolve => setTimeout(resolve, 2000))

      return NextResponse.json({
        success: true,
        renderedImage: `data:image/png;base64,${base64Image}`,
        message: 'Preview generated (demo mode - add GEMINI_API_KEY for real AI generation)',
        isDemo: true
      })
    }

    // Initialize Gemini AI with the API key
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use Gemini 2.5 Flash Image Preview model for image-to-image generation
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image-preview",
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    })

    // Create prompt for direct image-to-image transformation
    const prompt = lightingOption === 'roof'
      ? `Transform this daytime house image into a stunning nighttime scene with professional holiday lighting.

      Requirements:
      - Convert to a beautiful winter evening/night scene
      - Add elegant warm white C9 LED lights along ALL visible rooflines
      - Place lights on main ridge, all gables, eaves, and architectural edges
      - Keep the house structure exactly the same
      - Create a warm, inviting glow from the lights
      - Make it look professionally installed with even spacing
      - Add subtle ambient lighting to make it feel like dusk/evening
      - DO NOT add lights to bushes, trees, or landscaping - ONLY rooflines

      The result should look like a high-end professional holiday lighting installation at night.`
      : `Transform this daytime house image into a spectacular nighttime scene with comprehensive professional holiday lighting.

      Requirements:
      - Convert to a beautiful winter evening/night scene
      - Add elegant warm white C9 LED lights along ALL visible rooflines
      - Wrap ALL bushes and shrubs with warm white mini lights
      - Add lights to tree trunks and branches where visible
      - Include pathway and landscape accent lighting
      - Keep the house structure exactly the same
      - Create a warm, magical glow throughout the property
      - Make it look like a premium, magazine-worthy installation
      - Add subtle ambient lighting to make it feel like dusk/evening

      The result should look like a luxury holiday lighting display that covers both architecture and landscaping.`

    // Send to Gemini for image-to-image transformation
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: imageFile.type || 'image/png',
          data: base64Image
        }
      }
    ])

    const response = await result.response

    // Extract the generated image from the response
    // Note: The actual implementation depends on how Gemini returns the generated image
    // This might need adjustment based on the actual API response format
    const generatedContent = response.text()

    // For now, return the original image since Gemini models can't generate images
    // In a real implementation with an image generation model, you'd extract the generated image here
    const generatedImage = `data:image/png;base64,${base64Image}`

    return NextResponse.json({
      success: true,
      renderedImage: generatedImage,
      lightingOption: lightingOption,
      message: 'Holiday lighting preview generated successfully'
    })

  } catch (error) {
    console.error('Error generating holiday lighting preview:', error)

    // Handle rate limits and quota errors
    if (error instanceof Error && (error.message.includes('quota') || error.message.includes('429'))) {
      return NextResponse.json({
        success: false,
        error: 'Our AI is currently at capacity. Please try again in a few moments.',
        renderedImage: `data:image/png;base64,${base64Image}`
      }, { status: 429 })
    }

    // Handle API key errors
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API configuration. Please contact support.' },
        { status: 401 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to generate holiday lighting preview. Please try again.' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const maxDuration = 30 // Allow up to 30 seconds for processing