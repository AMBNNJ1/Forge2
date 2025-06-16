import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricProps {
  value: string
  label: string
}

function Metric({ value, label }: MetricProps) {
  return (
    <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{label}</CardContent>
    </Card>
  )
}

export default function Metrics() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Metric value="$2.4M" label="Total Liquidity Pooled" />
      <Metric value="127" label="Tokens Launched" />
      <Metric value="15K" label="Community Members" />
    </div>
  )
}
