import Link from "next/link"
import { Advisor } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AdvisorCardProps {
  advisor: Advisor
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{advisor.name}</CardTitle>
        <CardDescription>{advisor.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{advisor.description}</p>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Location:</strong> {advisor.location.city}, {advisor.location.region}
            </p>
            <p className="text-sm">
              <strong>Hours:</strong> {advisor.openingHours}
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href={`/${advisor.type}/${advisor.location.city.toLowerCase()}/${advisor.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}