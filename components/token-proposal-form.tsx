"use client"

import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProposalForm {
  name: string
  symbol: string
  supply: string
  tokenomics: string
  image: string
  chain: string
}

export default function TokenProposalForm() {
  const form = useForm<ProposalForm>({
    defaultValues: {
      name: "",
      symbol: "",
      supply: "",
      tokenomics: "",
      image: "",
      chain: "",
    },
  })

  const onSubmit = async (values: ProposalForm) => {
    await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    form.reset()
  }

  return (
    <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
      <CardHeader>
        <CardTitle>Propose a Token</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Token Name
            </label>
            <Input id="name" {...form.register("name", { required: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="symbol">
              Token Symbol
            </label>
            <Input id="symbol" {...form.register("symbol", { required: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="supply">
              Total Supply
            </label>
            <Input id="supply" type="number" {...form.register("supply", { required: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="tokenomics">
              Tokenomics
            </label>
            <Textarea id="tokenomics" {...form.register("tokenomics")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="image">
              Image URL
            </label>
            <Input id="image" {...form.register("image")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="chain">
              Chain Preference
            </label>
            <Select value={form.watch("chain")} onValueChange={(v) => form.setValue("chain", v)}>
              <SelectTrigger id="chain">
                <SelectValue placeholder="Select a chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="avalanche">Avalanche</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="ml-auto">
            Submit Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
