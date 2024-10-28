import { Advisor, AdvisorType } from "./types"

// Mock data for static generation
const advisors: Advisor[] = [
  {
    id: 1,
    name: "John Smith",
    company: "London Mortgage Solutions",
    type: "mortgage",
    location: {
      city: "London",
      region: "Greater London"
    },
    phone: "+44 20 1234 5678",
    website: "https://example.com",
    description: "Experienced mortgage advisor with over 15 years in the industry. Specializing in first-time buyers and buy-to-let mortgages.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["First Time Buyers", "Buy to Let", "Remortgage"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Manchester Financial Services",
    type: "mortgage",
    location: {
      city: "Manchester",
      region: "Greater Manchester"
    },
    phone: "+44 161 234 5678",
    website: "https://example.com",
    description: "Award-winning mortgage advisor helping families find their dream homes. Expert in residential and commercial mortgages.",
    openingHours: "Monday - Friday: 9:00 - 18:00",
    specialties: ["Residential Mortgages", "Commercial Mortgages", "First Time Buyers"]
  },
  {
    id: 3,
    name: "David Williams",
    company: "London Insurance Group",
    type: "insurance",
    location: {
      city: "London",
      region: "Greater London"
    },
    phone: "+44 20 2345 6789",
    website: "https://example.com",
    description: "Comprehensive insurance solutions for individuals and businesses. Specializing in life, health, and property insurance.",
    openingHours: "Monday - Friday: 8:30 - 17:00",
    specialties: ["Life Insurance", "Health Insurance", "Property Insurance"]
  },
  {
    id: 4,
    name: "Emma Brown",
    company: "Birmingham Financial Advisors",
    type: "financial",
    location: {
      city: "Birmingham",
      region: "West Midlands"
    },
    phone: "+44 121 345 6789",
    website: "https://example.com",
    description: "Certified financial planner offering personalized investment and retirement planning services.",
    openingHours: "Monday - Friday: 9:00 - 17:00",
    specialties: ["Investment Planning", "Retirement Planning", "Estate Planning"]
  },
  {
    id: 5,
    name: "Michael Chen",
    company: "Edinburgh Insurance Solutions",
    type: "insurance",
    location: {
      city: "Edinburgh",
      region: "Scotland"
    },
    phone: "+44 131 456 7890",
    website: "https://example.com",
    description: "Specialized in business insurance and risk management solutions. Helping companies protect their assets and employees.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["Business Insurance", "Professional Liability", "Cyber Insurance"]
  },
  {
    id: 6,
    name: "Rachel Taylor",
    company: "Glasgow Financial Planning",
    type: "financial",
    location: {
      city: "Glasgow",
      region: "Scotland"
    },
    phone: "+44 141 567 8901",
    website: "https://example.com",
    description: "Independent financial advisor specializing in wealth management and tax planning strategies.",
    openingHours: "Monday - Friday: 9:00 - 18:00",
    specialties: ["Wealth Management", "Tax Planning", "Investment Strategy"]
  },
  {
    id: 7,
    name: "James Wilson",
    company: "Liverpool Mortgages Direct",
    type: "mortgage",
    location: {
      city: "Liverpool",
      region: "Merseyside"
    },
    phone: "+44 151 678 9012",
    website: "https://example.com",
    description: "Helping first-time buyers and property investors find the best mortgage deals. Expertise in buy-to-let mortgages.",
    openingHours: "Monday - Friday: 9:00 - 17:00",
    specialties: ["First Time Buyers", "Buy to Let", "Property Investment"]
  },
  {
    id: 8,
    name: "Sophie Anderson",
    company: "Manchester Insurance Advisors",
    type: "insurance",
    location: {
      city: "Manchester",
      region: "Greater Manchester"
    },
    phone: "+44 161 789 0123",
    website: "https://example.com",
    description: "Providing tailored insurance solutions for families and individuals. Expert in life and health insurance planning.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["Life Insurance", "Health Insurance", "Family Protection"]
  },
  {
    id: 9,
    name: "Oliver Thompson",
    company: "Birmingham Mortgage Centre",
    type: "mortgage",
    location: {
      city: "Birmingham",
      region: "West Midlands"
    },
    phone: "+44 121 890 1234",
    website: "https://example.com",
    description: "Specialist mortgage advisor focusing on complex cases and self-employed applicants.",
    openingHours: "Monday - Friday: 9:00 - 17:00",
    specialties: ["Self-Employed Mortgages", "Complex Cases", "Remortgage"]
  },
  {
    id: 10,
    name: "Lisa Murphy",
    company: "Edinburgh Wealth Management",
    type: "financial",
    location: {
      city: "Edinburgh",
      region: "Scotland"
    },
    phone: "+44 131 901 2345",
    website: "https://example.com",
    description: "Experienced financial advisor providing comprehensive retirement and estate planning services.",
    openingHours: "Monday - Friday: 9:00 - 17:30",
    specialties: ["Retirement Planning", "Estate Planning", "Investment Management"]
  }
]

const advisorTypes: AdvisorType[] = [
  {
    slug: "mortgage",
    title: "Mortgage Advisors",
    description: "Find expert mortgage advisors to guide you through the home buying process",
    icon: "home"
  },
  {
    slug: "insurance",
    title: "Insurance Advisors",
    description: "Connect with insurance professionals to protect what matters most",
    icon: "shield"
  },
  {
    slug: "financial",
    title: "Financial Advisors",
    description: "Get expert guidance on financial planning and investments",
    icon: "briefcase"
  }
]

export async function getAdvisorById(id: number): Promise<Advisor | undefined> {
  return advisors.find(advisor => advisor.id === id)
}

export async function getAllAdvisors(): Promise<Advisor[]> {
  return advisors
}

export async function getAdvisorsByType(type: string): Promise<Advisor[]> {
  return advisors.filter(advisor => advisor.type === type.toLowerCase())
}

export async function getAdvisorsByCity(city: string): Promise<Advisor[]> {
  return advisors.filter(advisor => 
    advisor.location.city.toLowerCase() === city.toLowerCase()
  )
}

export async function searchAdvisors(params: {
  type?: string
  city?: string
  service?: string
  query?: string
}): Promise<Advisor[]> {
  return advisors.filter(advisor => {
    if (params.type && advisor.type !== params.type) return false
    if (params.city && advisor.location.city.toLowerCase() !== params.city.toLowerCase()) return false
    if (params.service && !advisor.specialties.some(s => 
      s.toLowerCase().includes(params.service!.toLowerCase())
    )) return false
    if (params.query) {
      const searchStr = `${advisor.name} ${advisor.company} ${advisor.description} ${advisor.specialties.join(" ")}`.toLowerCase()
      if (!searchStr.includes(params.query.toLowerCase())) return false
    }
    return true
  })
}

export async function getAdvisorType(slug: string): Promise<AdvisorType | undefined> {
  return advisorTypes.find(type => type.slug === slug.toLowerCase())
}

export async function getAllAdvisorTypes(): Promise<AdvisorType[]> {
  return advisorTypes
}