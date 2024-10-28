import { PageLayout } from "@/components/layout/PageLayout"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesSection } from "@/components/sections/ServicesSection"

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ServicesSection />
    </PageLayout>
  )
}