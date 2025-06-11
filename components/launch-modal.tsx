"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LaunchForm {
  name: string
  symbol: string
  image: string
  chain: string
  wallet: string
  rpcUrl: string
  supply: string
  lockDuration: string
  tokenomics: string
  burnRate: string
  transactionTax: string
  presaleDuration: string
}

const steps = [
  "Token Details",
  "Select Blockchain",
  "Wallet & Network",
  "Tokenomics",
  "Advanced Settings",
]

interface LaunchModalProps {
  children: React.ReactNode
}

export default function LaunchModal({ children }: LaunchModalProps) {
  const form = useForm<LaunchForm>({
    defaultValues: {
      name: "",
      symbol: "",
      image: "",
      chain: "",
      wallet: "",
      rpcUrl: "",
      supply: "",
      lockDuration: "",
      tokenomics: "",
      burnRate: "",
      transactionTax: "",
      presaleDuration: "",
    },
  })
  const [step, setStep] = useState(0)

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async (values: LaunchForm) => {
    const res = await fetch("/api/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      console.error("Deployment failed")
    } else {
      const data = await res.json()
      console.log("Deployed", data.address)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 border-none bg-transparent">
        <Card className="max-w-xl mx-auto rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
          <CardHeader>
            <CardTitle>{`Step ${step + 1} of ${steps.length}: ${steps[step]}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <>
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
                    <label className="text-sm font-medium" htmlFor="image">
                      Token Image URL
                    </label>
                    <Input id="image" {...form.register("image")}/>
                  </div>
                </>
              )}
              {step === 1 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="chain">
                    Chain
                  </label>
                  <Select
                    value={form.watch("chain")}
                    onValueChange={(value) => form.setValue("chain", value)}
                  >
                    <SelectTrigger id="chain">
                      <SelectValue placeholder="Select a chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="wallet">
                      Wallet Address
                    </label>
                    <Input id="wallet" {...form.register("wallet", { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="rpcUrl">
                      RPC URL
                    </label>
                    <Input id="rpcUrl" {...form.register("rpcUrl", { required: true })} />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="supply">
                      Total Supply
                    </label>
                    <Input
                      id="supply"
                      type="number"
                      {...form.register("supply", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="lockDuration">
                      LP Lock Duration (days)
                    </label>
                    <Input
                      id="lockDuration"
                      type="number"
                      {...form.register("lockDuration", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="tokenomics">
                      Tokenomics
                    </label>
                    <Textarea id="tokenomics" {...form.register("tokenomics")} />
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="burnRate">
                      Burn Rate (%)
                    </label>
                    <Input id="burnRate" type="number" {...form.register("burnRate")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="transactionTax">
                      Transaction Tax (%)
                    </label>
                    <Input id="transactionTax" type="number" {...form.register("transactionTax")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="presaleDuration">
                      Presale Duration (days)
                    </label>
                    <Input id="presaleDuration" type="number" {...form.register("presaleDuration")} />
                  </div>
                </>
              )}
              <div className="flex justify-between pt-4">
                {step > 0 && (
                  <Button type="button" variant="secondary" onClick={back}>
                    Back
                  </Button>
                )}
                {step < steps.length - 1 && (
                  <Button type="button" onClick={next} className="ml-auto">
                    Next
                  </Button>
                )}
                {step === steps.length - 1 && (
                  <Button type="submit" className="ml-auto">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
