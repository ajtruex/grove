import "./globals.css"
import type { Metadata } from "next"
import { Inter, Figtree } from "next/font/google"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "Focus Grove - Cultivate Your Focus",
  description:
    "Cultivate your focus, one digital tree at a time. A beautiful productivity app that gamifies focus sessions through digital nature growth.",
  keywords: [
    "productivity",
    "focus",
    "pomodoro",
    "meditation",
    "nature",
    "trees",
    "mindfulness",
  ],
  authors: [{ name: "Focus Grove Team" }],
  creator: "Focus Grove",
  publisher: "Focus Grove",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://focusgrove.app"),
  openGraph: {
    title: "Focus Grove - Cultivate Your Focus",
    description:
      "A beautiful productivity app that helps you stay focused by growing a magical digital forest.",
    url: "https://focusgrove.app",
    siteName: "Focus Grove",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Grove - Cultivate Your Focus",
    description:
      "A beautiful productivity app that helps you stay focused by growing a magical digital forest.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes here when ready
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${figtree.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
