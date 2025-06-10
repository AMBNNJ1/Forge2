import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HeroCard() {
  return (
    <Card className="w-full rounded-xl border border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Forge Tokens</CardTitle>
        <CardDescription>Create Leaderboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <span className="font-medium">L2 Trending:</span>{" "}
          $CAST <span className="text-green-500">+8.6%</span>{" "}
          $LCH <span className="text-green-500">+6.7%</span>{" "}
          $BOUNCE <span className="text-green-500">+5%</span>{" "}
          $EKHO <span className="text-green-500">+1%</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cast</TableCell>
              <TableCell>3s</TableCell>
              <TableCell className="text-right">$217K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Change</TableCell>
              <TableCell>17s</TableCell>
              <TableCell className="text-right">$646K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bounce</TableCell>
              <TableCell>20s</TableCell>
              <TableCell className="text-right">$511K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Drips</TableCell>
              <TableCell>1m</TableCell>
              <TableCell className="text-right">$413K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Blythe</TableCell>
              <TableCell>6m</TableCell>
              <TableCell className="text-right">$990K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vogue</TableCell>
              <TableCell>8m</TableCell>
              <TableCell className="text-right">$16K</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
