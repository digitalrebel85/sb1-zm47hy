import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://findanadvisor.online'),
  title: {
    default: "Find an Advisor - Connect with Financial Experts",
    template: "%s | Find an Advisor"
  },
  description: "Connect with top mortgage, insurance, and financial advisors across the UK. Get expert guidance for your financial decisions.",
  keywords: ["financial advisor", "mortgage advisor", "insurance advisor", "UK financial services", "financial planning"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://findanadvisor.online",
    title: "Find an Advisor - Connect with Financial Experts",
    description: "Connect with top mortgage, insurance, and financial advisors across the UK",
    siteName: "Find an Advisor"
  },
  twitter: {
    card: "summary_large_image",
    title: "Find an Advisor - Connect with Financial Experts",
    description: "Connect with top mortgage, insurance, and financial advisors across the UK"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your verification code
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}