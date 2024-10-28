import { NextResponse } from "next/server"
import { searchAdvisors } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const city = searchParams.get("city")
  const service = searchParams.get("service")
  const query = searchParams.get("q")

  try {
    const advisors = await searchAdvisors({
      type: type || undefined,
      city: city || undefined,
      service: service || undefined,
      query: query || undefined,
    })
    return NextResponse.json(advisors)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch advisors" },
      { status: 500 }
    )
  }
}