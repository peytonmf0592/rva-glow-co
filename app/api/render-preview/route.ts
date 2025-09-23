import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

/*
 * GEMINI API QUOTA NOTES:
 * - Free tier has daily limits for image generation models
 * - Common quota errors: generate_content_free_tier_input_token_count
 * - When quota exceeded, we gracefully fallback to demo mode
 * - To upgrade: Enable billing in Google Cloud Console and increase quotas
 * - Alternative: Wait for daily quota reset (typically midnight PST)
 */

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

    // Try different Gemini models to find the right one for image generation
    let modelName = "gemini-2.5-flash-image-preview"

    // First try to test if the model exists with a simple call
    try {
      const testModel = genAI.getGenerativeModel({ model: modelName })
      console.log(`Testing model: ${modelName}`)

      // Test if model supports image generation by checking available methods
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.8,
          candidateCount: 1,
          maxOutputTokens: 4096,
        }
      })

      console.log(`Using model: ${modelName}`)
    } catch (modelError) {
      console.log(`Model ${modelName} failed, trying fallback models`)

      // Try alternative model names
      const fallbackModels = [
        "gemini-2.0-flash-exp",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
      ]

      for (const fallbackModel of fallbackModels) {
        try {
          const testModel = genAI.getGenerativeModel({ model: fallbackModel })
          modelName = fallbackModel
          console.log(`Using fallback model: ${modelName}`)
          break
        } catch (e) {
          console.log(`Model ${fallbackModel} also failed`)
        }
      }
    }

    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.8,
        candidateCount: 1,
        maxOutputTokens: 4096,
      }
    })

    // Create prompt for image-to-image transformation with Gemini 2.5 Flash Image Preview
    const prompt = lightingOption === 'roof'
      ? `Please generate a new version of this house image with the following modifications:

      1. Transform the scene from daytime to a beautiful evening/night setting
      2. Add professional warm white C9 LED holiday lights along ALL visible rooflines:
         - Main ridge lines
         - All gable edges
         - Eave lines
         - Dormer rooflines
         - Any architectural roof features
      3. Keep the house structure and architecture exactly the same
      4. Create a warm, inviting glow from the lights with realistic light reflection
      5. Add subtle evening ambient lighting and shadows
      6. Make the lights look professionally installed with even 12-18 inch spacing
      7. DO NOT add lights to landscaping - ONLY rooflines

      Generate a realistic nighttime image showing this exact house with elegant roofline holiday lighting.`
      : `Please generate a new version of this house image with the following modifications:

      1. Transform the scene from daytime to a beautiful evening/night setting
      2. Add comprehensive professional holiday lighting:
         - Warm white C9 LED lights along ALL visible rooflines
         - Warm white mini lights wrapped around all bushes and shrubs
         - Lights on tree trunks and branches where visible
         - Subtle pathway and landscape accent lighting
      3. Keep the house structure and architecture exactly the same
      4. Create a warm, magical glow throughout the entire property
      5. Add evening ambient lighting and realistic shadows
      6. Make it look like a premium, magazine-worthy holiday installation
      7. Ensure all lighting looks professionally installed

      Generate a realistic nighttime image showing this exact house with complete holiday lighting coverage.`

    console.log(`Sending request to Gemini model: ${model.model}`)
    console.log(`Image size: ${Math.round(base64Image.length / 1024)}KB`)
    console.log(`Lighting option: ${lightingOption}`)

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
    console.log('Gemini response received:', {
      candidates: response.candidates?.length || 0,
      hasText: typeof response.text === 'function' ? 'yes' : 'no'
    })

    // Log the full response structure for debugging
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0]
      console.log('First candidate structure:', {
        hasContent: !!candidate.content,
        partsCount: candidate.content?.parts?.length || 0,
        partTypes: candidate.content?.parts?.map(p => Object.keys(p)) || []
      })
    }

    // Extract the generated image from Gemini 2.5 Flash Image Preview response
    const candidates = response.candidates
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates returned by Gemini')
    }

    // Look for inline_data in the response parts
    let generatedImageData = null
    let textResponse = ''

    for (const candidate of candidates) {
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log('Found generated image data')
            generatedImageData = part.inlineData.data
            break
          }
          if (part.text) {
            textResponse += part.text
          }
        }
      }
    }

    console.log('Text response:', textResponse ? 'received' : 'none')
    console.log('Generated image:', generatedImageData ? 'found' : 'not found')

    if (!generatedImageData) {
      console.log('No generated image found, using original')
      // For now, return original image since Gemini 2.5 Flash might not support image generation yet
      generatedImageData = base64Image
    }

    const generatedImage = `data:image/png;base64,${generatedImageData}`

    return NextResponse.json({
      success: true,
      renderedImage: generatedImage,
      lightingOption: lightingOption,
      message: 'Holiday lighting preview processed',
      textAnalysis: textResponse || null,
      imageGenerated: !!generatedImageData && generatedImageData !== base64Image
    })

  } catch (error) {
    console.error('Error generating holiday lighting preview:', error)

    // Handle rate limits and quota errors
    if (error instanceof Error && (error.message.includes('quota') || error.message.includes('429') || error.message.includes('exceeded'))) {
      console.log('Quota exceeded - returning demo mode with original image')
      return NextResponse.json({
        success: true,
        renderedImage: `data:image/png;base64,${base64Image}`,
        message: 'Preview generated (demo mode - AI quota temporarily exceeded). Contact us for a personalized consultation!',
        isDemo: true,
        quotaExceeded: true
      }, { status: 200 })
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