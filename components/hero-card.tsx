import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function HeroCard() {
  return (
    <Card className="w-full rounded-xl border border-border/20 bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-xl">
      <CardHeader>
        <CardTitle>Forge Tokens</CardTitle>
        <CardDescription>Create Leaderboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Trending:</span>{" "}
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
          <TableBody className="[&_tr]:border-0">
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">C</AvatarFallback>
                </Avatar>
                <span>Cast</span>
              </TableCell>
              <TableCell>3s</TableCell>
              <TableCell className="text-right">$217K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">C</AvatarFallback>
                </Avatar>
                <span>Change</span>
              </TableCell>
              <TableCell>17s</TableCell>
              <TableCell className="text-right">$646K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">B</AvatarFallback>
                </Avatar>
                <span>Bounce</span>
              </TableCell>
              <TableCell>20s</TableCell>
              <TableCell className="text-right">$511K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">D</AvatarFallback>
                </Avatar>
                <span>Drips</span>
              </TableCell>
              <TableCell>1m</TableCell>
              <TableCell className="text-right">$413K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">B</AvatarFallback>
                </Avatar>
                <span>Blythe</span>
              </TableCell>
              <TableCell>6m</TableCell>
              <TableCell className="text-right">$990K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">V</AvatarFallback>
                </Avatar>
                <span>Vogue</span>
              </TableCell>
              <TableCell>8m</TableCell>
              <TableCell className="text-right">$16K</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
