"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { tokens } from "@/lib/tokens"

export default function TokenDetailPage() {
  const params = useParams()
  const symbol = Array.isArray(params.symbol) ? params.symbol[0] : params.symbol
  const token = tokens.find(
    (t) => t.symbol.toLowerCase() === String(symbol).toLowerCase()
  )

  if (!token) {
    return (
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg">Token not found</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CrowdLaunch</span>
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-xl px-4 md:px-6">
          <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow">
            <CardHeader>
              <CardTitle className="text-xl">
                {token.name} ({token.symbol})
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{token.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Chain</span>
                <span>{token.chain}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Progress</span>
                  <span>{token.progress}%</span>
                </div>
                <Progress value={token.progress} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Raised</div>
                  <div>{token.raised}</div>
                </div>
                <div>
                  <div className="font-medium">Goal</div>
                  <div>{token.goal}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>{token.backers} backers</span>
                <span>{token.daysLeft} days left</span>
              </div>
              <Button className="w-full">Back This Token</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
