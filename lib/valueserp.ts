import { Advisor } from "@/lib/types"

const VALUESERP_API_KEY = process.env.VALUESERP_API_KEY
const BASE_URL = "https://api.valueserp.com/search"

interface ValueSerpResponse {
  organic_results: Array<{
    title: string
    link: string
    snippet: string
    phone?: string
    address?: string
    rating?: {
      rating: number
      reviews: number
    }
  }>
}

export async function searchAdvisors(params: {
  type: string
  city: string
  page?: number
}): Promise<Advisor[]> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: VALUESERP_API_KEY,
        q: `${params.type} advisors in ${params.city}`,
        location: "United Kingdom",
        google_domain: "google.co.uk",
        gl: "uk",
        hl: "en",
        page: params.page || 1,
        num: 10,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch advisors")
    }

    const data: ValueSerpResponse = await response.json()

    return data.organic_results.map((result, index) => ({
      id: index + 1,
      name: result.title,
      company: result.title,
      type: params.type,
      description: result.snippet,
      website: result.link,
      phone: result.phone,
      location: {
        city: params.city,
        region: "Unknown",
        address: result.address,
      },
    }))
  } catch (error) {
    console.error("Error fetching from ValueSerp:", error)
    return []
  }
}