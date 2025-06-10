"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LaunchForm {
  name: string
  symbol: string
  supply: string
  chain: string
  mechanics: string
}

const steps = ["Name", "Symbol", "Supply", "Chain", "Mechanics"]

export default function LaunchPage() {
  const form = useForm<LaunchForm>({
    defaultValues: {
      name: "",
      symbol: "",
      supply: "",
      chain: "",
      mechanics: "",
    },
  })
  const [step, setStep] = useState(0)

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = (values: LaunchForm) => {
    console.log("Submitted", values)
  }

  return (
    <div className="container mx-auto max-w-xl py-10">
      <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
        <CardHeader>
          <CardTitle>{`Step ${step + 1} of ${steps.length}: ${steps[step]}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {step === 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Token Name
                </label>
                <Input id="name" {...form.register("name", { required: true })} />
              </div>
            )}
            {step === 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="symbol">
                  Symbol
                </label>
                <Input id="symbol" {...form.register("symbol", { required: true })} />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="supply">
                  Total Supply
                </label>
                <Input id="supply" type="number" {...form.register("supply", { required: true })} />
              </div>
            )}
            {step === 3 && (
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
            {step === 4 && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="mechanics">
                  Mechanics
                </label>
                <Textarea id="mechanics" {...form.register("mechanics")} />
              </div>
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
    </div>
  )
}
