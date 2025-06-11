"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock } from "lucide-react"

export function AuditBadge({ status }: { status: "audited" | "pending" }) {
  return status === "audited" ? (
    <Badge variant="secondary" className="flex items-center gap-1">
      <CheckCircle2 className="w-3 h-3" /> Audited
    </Badge>
  ) : (
    <Badge variant="outline" className="flex items-center gap-1">
      <Clock className="w-3 h-3" /> Audit Pending
    </Badge>
  )
}
