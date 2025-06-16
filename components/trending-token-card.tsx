import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export interface TrendingToken {
  name: string
  symbol: string
  chain: string
  description: string
  progress: number
  raised: string
  goal: string
  backers: number
  daysLeft: number
}

export default function TrendingTokenCard({
  name,
  symbol,
  chain,
  description,
  progress,
  raised,
  goal,
  backers,
  daysLeft,
}: TrendingToken) {
  return (
    <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {name} ({symbol})
          <span className="text-sm font-normal text-muted-foreground">{chain}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Raised</div>
            <div>{raised}</div>
          </div>
          <div>
            <div className="font-medium">Goal</div>
            <div>{goal}</div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>{backers} backers</span>
          <span>{daysLeft} days left</span>
        </div>
        <Button className="w-full">Back This Token</Button>
      </CardContent>
    </Card>
  )
}
