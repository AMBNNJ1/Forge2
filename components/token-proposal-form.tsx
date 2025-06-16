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
  supply: number
  tokenomics: string
  image: string
  chain: string
}

export default function TokenProposalForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProposalForm>({
    defaultValues: {
      name: "",
      symbol: "",
      supply: 0,
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
    reset()
  }

  return (
    <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
      <CardHeader>
        <CardTitle>Propose a Token</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Token Name
            </label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="symbol">
              Token Symbol
            </label>
            <Input
              id="symbol"
              {...register("symbol", {
                required: "Symbol is required",
                pattern: {
                  value: /^[A-Z0-9]{2,10}$/,
                  message: "Use 2-10 uppercase letters or numbers",
                },
              })}
            />
            {errors.symbol && (
              <p className="text-sm text-destructive">{errors.symbol.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="supply">
              Total Supply
            </label>
            <Input
              id="supply"
              type="number"
              {...register("supply", {
                required: "Supply is required",
                valueAsNumber: true,
                min: { value: 1, message: "Supply must be positive" },
              })}
            />
            {errors.supply && (
              <p className="text-sm text-destructive">{errors.supply.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="tokenomics">
              Tokenomics
            </label>
            <Textarea id="tokenomics" {...register("tokenomics")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="image">
              Image URL
            </label>
            <Input
              id="image"
              {...register("image", {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Enter a valid URL",
                },
              })}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="chain">
              Chain Preference
            </label>
            <input type="hidden" {...register("chain", { required: "Chain is required" })} />
            <Select value={watch("chain")} onValueChange={(v) => setValue("chain", v)}>
              <SelectTrigger id="chain">
                <SelectValue placeholder="Select a chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="avalanche">Avalanche</SelectItem>
              </SelectContent>
            </Select>
            {errors.chain && (
              <p className="text-sm text-destructive">{errors.chain.message}</p>
            )}
          </div>
          <Button type="submit" className="ml-auto">
            Submit Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
