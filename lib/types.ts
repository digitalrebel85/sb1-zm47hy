export interface Location {
  city: string
  region: string
}

export interface Advisor {
  id: number
  name: string
  company: string
  type: string
  location: Location
  phone: string
  website: string
  description: string
  openingHours: string
}

export interface AdvisorType {
  slug: string
  title: string
  description: string
  icon: string
}