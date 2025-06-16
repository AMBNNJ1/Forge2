"use client"

import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import TrendingTokenCard from "@/components/trending-token-card"
import { tokens } from "@/lib/tokens"

export default function TokensPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CrowdLaunch</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/#features" className="hover:text-foreground transition-colors">Why CrowdLaunch</Link>
            <Link href="/#trending" className="hover:text-foreground transition-colors">Trending</Link>
            <Link href="/#propose" className="hover:text-foreground transition-colors">Launch</Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6">
            All Token Launches
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {tokens.map((t) => (
              <Link key={t.symbol} href={`/tokens/${t.symbol.toLowerCase()}`}
                className="block">
                <TrendingTokenCard {...t} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
