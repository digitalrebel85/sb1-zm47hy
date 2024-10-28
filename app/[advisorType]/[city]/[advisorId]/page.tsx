import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdvisorById } from "@/lib/data"
import { AdvisorProfile } from "@/components/advisor/AdvisorProfile"
import { BookingSection } from "@/components/booking/BookingSection"

interface PageProps {
  params: {
    advisorType: string
    city: string
    advisorId: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const advisor = await getAdvisorById(parseInt(params.advisorId))
  
  if (!advisor) {
    return {}
  }

  const title = `${advisor.name} - ${advisor.type.charAt(0).toUpperCase() + advisor.type.slice(1)} Advisor in ${advisor.location.city}`
  const description = advisor.description.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [`/api/og?title=${encodeURIComponent(title)}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function AdvisorDetailPage({ params }: PageProps) {
  const advisor = await getAdvisorById(parseInt(params.advisorId))

  if (!advisor) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://findanadvisor.online/advisor/${advisor.id}`,
    name: advisor.name,
    description: advisor.description,
    url: `https://findanadvisor.online/${params.advisorType}/${params.city}/${params.advisorId}`,
    telephone: advisor.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: advisor.location.city,
      addressRegion: advisor.location.region,
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: advisor.location.latitude,
      longitude: advisor.location.longitude
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '17:00'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AdvisorProfile advisor={advisor} />
          </div>
          <div>
            <BookingSection advisor={advisor} />
          </div>
        </div>
      </div>
    </>
  )
}