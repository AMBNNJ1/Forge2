"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, RefreshCcw, Settings, Lock } from "lucide-react"

interface LaunchForm {
  name: string
  symbol: string
  image: FileList | null
  chain: string
  lockDuration: string
  tokenomics: string
}

const steps = [
  "Token Details",
  "Select Blockchain",
  "Choose Tokenomics",
  "LP Lock Duration",
]

export default function LaunchPage() {
  const form = useForm<LaunchForm>({
    defaultValues: {
      name: "PepeCoin",
      symbol: "PEPE",
      image: null,
      chain: "",
      lockDuration: "",
      tokenomics: "",
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
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Token Name
                  </label>
                  <Input
                    id="name"
                    placeholder="PepeCoin"
                    {...form.register("name", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="symbol">
                    Token Symbol
                  </label>
                  <Input
                    id="symbol"
                    placeholder="PEPE"
                    {...form.register("symbol", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="image">
                    Token Image
                  </label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg"
                    {...form.register("image")}
                  />
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </>
            )}
            {step === 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="chain">
                  Select Blockchain
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      value: "solana",
                      name: "Solana",
                      desc: "Low fees, fast",
                      img: "/solana.png",
                    },
                    {
                      value: "base",
                      name: "Base",
                      desc: "Coinbase L2",
                      img: "/base.png",
                    },
                    {
                      value: "avalanche",
                      name: "Avalanche",
                      desc: "High throughput",
                      img: "/avalanche.png",
                    },
                  ].map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => form.setValue("chain", c.value)}
                      className={cn(
                        "rounded-lg border p-2 text-center hover:bg-muted focus:outline-none",
                        form.watch("chain") === c.value &&
                          "border-primary ring-2 ring-primary"
                      )}
                    >
                      <Image
                        src={c.img}
                        alt={c.name}
                        width={40}
                        height={40}
                        className="mx-auto mb-1"
                      />
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Tokenomics</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      value: "fair",
                      name: "Fair Launch",
                      subtitle: "100% LP lock, no tax",
                      points: [
                        "No buy/sell taxes",
                        "LP locked automatically",
                        "Maximum transparency",
                      ],
                      icon: Lock,
                    },
                    {
                      value: "burn",
                      name: "Burn Mode",
                      subtitle: "1% burn on transactions",
                      points: [
                        "Deflationary mechanics",
                        "1% burn per transaction",
                        "Increasing scarcity",
                      ],
                      icon: Flame,
                    },
                    {
                      value: "tax",
                      name: "Tax & Redistribute",
                      subtitle:
                        "Transaction tax with redistribution to holders and liquidity",
                      points: [
                        "2% transaction tax",
                        "40% to liquidity",
                        "40% to marketing",
                        "20% holder rewards",
                      ],
                      icon: RefreshCcw,
                    },
                    {
                      value: "advanced",
                      name: "Advanced DeFi",
                      subtitle:
                        "Complex tokenomics with multiple tax mechanisms and features",
                      points: [
                        "Variable buy/sell tax",
                        "Anti-bot protection",
                        "Multiple wallets",
                        "Emergency controls",
                      ],
                      icon: Settings,
                    },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => form.setValue("tokenomics", t.value)}
                      className={cn(
                        "rounded-lg border p-3 text-left hover:bg-muted focus:outline-none",
                        form.watch("tokenomics") === t.value &&
                          "border-primary ring-2 ring-primary"
                      )}
                    >
                      <t.icon className="h-6 w-6 mb-2" />
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{t.subtitle}</div>
                      <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-0.5">
                        {t.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">LP Lock Duration</label>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "7 Days", value: "7" },
                    { label: "30 Days", value: "30" },
                    { label: "90 Days", value: "90" },
                    { label: "1 Year", value: "365" },
                  ].map((l) => (
                    <button
                      type="button"
                      key={l.value}
                      onClick={() => form.setValue("lockDuration", l.value)}
                      className={cn(
                        "rounded-lg border p-2 text-center hover:bg-muted focus:outline-none",
                        form.watch("lockDuration") === l.value &&
                          "border-primary ring-2 ring-primary"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
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
                  Deploy Token
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
