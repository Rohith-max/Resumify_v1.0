import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resume AI Assistant",
  description: "AI-powered resume improvement and tailoring",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="border-b">
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Resume AI Assistant
              </Link>
              <div className="flex items-center gap-4">
                <nav className="flex gap-4">
                  <Link href="/">
                    <Button variant="ghost">Home</Button>
                  </Link>
                  <Link href="/improve">
                    <Button variant="ghost">Improve</Button>
                  </Link>
                  <Link href="/tailor">
                    <Button variant="ghost">Tailor</Button>
                  </Link>
                  <Link href="/history">
                    <Button variant="ghost">History</Button>
                  </Link>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="mx-4 md:mx-6 lg:mx-8 my-6">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
