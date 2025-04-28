
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the API key from environment variables
    const REMOVE_BG_API_KEY = Deno.env.get('REMOVE_BG_API_KEY')
    if (!REMOVE_BG_API_KEY) {
      throw new Error('REMOVE_BG_API_KEY is not set')
    }

    // Get the image file from the request
    const { image } = await req.json()
    if (!image) {
      throw new Error('No image provided')
    }

    // Call remove.bg API
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: image,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.errors?.[0]?.title || 'Failed to remove background')
    }

    const result = await response.blob()
    const resultUrl = URL.createObjectURL(result)

    return new Response(JSON.stringify({ resultUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error removing background:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
