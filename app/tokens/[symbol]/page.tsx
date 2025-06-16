"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
        <div className="container mx-auto max-w-2xl px-4 md:px-6 space-y-6">
          <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {token.name} ({token.symbol})
              </CardTitle>
              <p className="text-sm text-muted-foreground">{token.description}</p>
            </CardHeader>
          </Card>

          <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Chain</div>
                <div>{token.chain}</div>
              </div>
              {token.status && (
                <div className="space-y-1">
                  <div className="font-medium">Status</div>
                  <div>{token.status}</div>
                </div>
              )}
              <div className="space-y-1">
                <div className="font-medium">Website</div>
                <div>
                  <Link href={token.website ?? '#'} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                    {token.website}
                  </Link>
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Launch Date</div>
                <div>{token.launchDate}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Launch Price</div>
                <div>{token.launchPrice}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Total Supply</div>
                <div>{token.totalSupply}</div>
              </div>
              {token.liquidityLock && (
                <div className="space-y-1">
                  <div className="font-medium">Liquidity Lock</div>
                  <div>{token.liquidityLock}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {token.tokenomics && (
            <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle>Tokenomics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-medium">Burn</div>
                  <div>{token.tokenomics.burn}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Tax</div>
                  <div>{token.tokenomics.tax}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">LP</div>
                  <div>{token.tokenomics.lp}</div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle>Funding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Funding Progress</span>
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

              {token.shareLink && (
                <div className="mt-4 space-y-2 text-sm">
                  <div className="font-medium">Shareable Link</div>
                  <div>
                    <Link href={token.shareLink} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                      {token.shareLink}
                    </Link>
                  </div>
                  <Button
                    onClick={() => navigator.clipboard.writeText(token.shareLink!)}
                    variant="secondary"
                    className="w-full mt-2"
                  >
                    Copy Link
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
