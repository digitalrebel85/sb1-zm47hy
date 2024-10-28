"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Advisor } from "@/lib/types"
import { AdvisorCard } from "@/components/advisor/AdvisorCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const query = searchParams.get("q")
  const type = searchParams.get("type")
  const city = searchParams.get("city")

  useEffect(() => {
    if (!query && !type && !city) {
      setLoading(false)
      return
    }

    async function fetchResults() {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?${searchParams.toString()}&page=${page}`)
        const data = await response.json()
        setAdvisors(prev => page === 1 ? data : [...prev, ...data])
      } catch (error) {
        console.error("Error fetching results:", error)
      }
      setLoading(false)
    }

    fetchResults()
  }, [query, type, city, page, searchParams])

  if (loading && page === 1) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!loading && advisors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No advisors found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {advisors.map((advisor) => (
          <AdvisorCard
            key={advisor.id}
            advisor={advisor}
            advisorType={type || ""}
            city={city || ""}
          />
        ))}
      </div>
      {advisors.length >= page * 10 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}