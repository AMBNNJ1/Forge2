"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
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
import { Progress } from "@/components/ui/progress"
import Stepper from "@/components/stepper"

interface LaunchForm {
  name: string
  symbol: string
  image: string
  chain: string
  wallet: string
  rpcUrl: string
  supply: string
  decimals: string
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
  "Funding",
]

export default function LaunchPage() {
  const form = useForm<LaunchForm>({
    defaultValues: {
      name: "",
      symbol: "",
      image: "",
      chain: "",
      wallet: "",
      rpcUrl: "",
      supply: "",
      decimals: "18",
      lockDuration: "",
      tokenomics: "",
      burnRate: "",
      transactionTax: "",
      presaleDuration: "",
    },
  })
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [raised, setRaised] = useState(0)
  const goal = 10
  const deadline = Date.now() + 7 * 24 * 60 * 60 * 1000
  const [timeLeft, setTimeLeft] = useState(deadline - Date.now())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(deadline - Date.now()), 1000)
    return () => clearInterval(id)
  }, [deadline])

  const connectWallet = async () => {
    if (form.watch("chain") === "solana") {
      // Phantom wallet
      if (typeof window !== "undefined" && (window as any).solana?.connect) {
        const resp = await (window as any).solana.connect()
        setAddress(resp.publicKey.toString())
      } else {
        alert("Phantom not found")
      }
    } else {
      // MetaMask
      if (typeof window !== "undefined" && (window as any).ethereum?.request) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })
        setAddress(accounts[0])
      } else {
        alert("MetaMask not found")
      }
    }
  }

  const deposit = () => {
    const amt = parseFloat(amount)
    if (!amt) return
    setRaised((r) => r + amt)
    setAmount("")
  }

  const progress = Math.min((raised / goal) * 100, 100)

  const formatTime = (ms: number) => {
    const total = Math.max(0, Math.floor(ms / 1000))
    const d = Math.floor(total / 86400)
    const h = Math.floor((total % 86400) / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    return `${d}d ${h}h ${m}m ${s}s`
  }

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
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full bg-background border-b border-border/40"
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">TokenForge</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#why-tokenforge" className="hover:text-foreground transition-colors">
              Why TokenForge
            </Link>
            <Link href="#who-is-it-for" className="hover:text-foreground transition-colors">
              For Everyone
            </Link>
            <Link href="#security" className="hover:text-foreground transition-colors">
              Security
            </Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/launch" className="hover:text-foreground transition-colors">
              Launch
            </Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Button variant="ghost" className="hidden sm:inline-flex">
              Contact
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/launch">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        <div className="container mx-auto max-w-xl py-10">
          <Card className="rounded-xl border border-border/20 bg-card/80 backdrop-blur shadow-xl">
        <CardHeader className="space-y-4">
          <Stepper steps={steps} currentStep={step} />
          <CardTitle className="text-center">{steps[step]}</CardTitle>
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
                    placeholder="Enter token name"
                    {...form.register("name", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="symbol">
                    Token Symbol
                  </label>
                  <Input
                    id="symbol"
                    placeholder="Enter token symbol"
                    {...form.register("symbol", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="image">
                    Token Image URL
                  </label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onloadend = () => form.setValue("image", reader.result as string)
                      reader.readAsDataURL(file)
                    }}
                  />
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
                  <Input
                    id="wallet"
                    placeholder="Enter wallet address"
                    {...form.register("wallet", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="rpcUrl">
                    RPC URL
                  </label>
                  <Input
                    id="rpcUrl"
                    placeholder="Enter RPC URL"
                    {...form.register("rpcUrl", { required: true })}
                  />
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
                  placeholder="Total supply"
                  {...form.register("supply", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="decimals">
                  Decimals
                </label>
                <Input
                  id="decimals"
                  type="number"
                  placeholder="Token decimals"
                  {...form.register("decimals", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="lockDuration">
                  LP Lock Duration (days)
                </label>
                <Input
                  id="lockDuration"
                  type="number"
                  placeholder="Lock duration in days"
                  {...form.register("lockDuration", { required: true })}
                />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="tokenomics">
                    Tokenomics
                  </label>
                  <Textarea
                    id="tokenomics"
                    placeholder="Describe tokenomics"
                    {...form.register("tokenomics")}
                  />
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="burnRate">
                    Burn Rate (%)
                  </label>
                  <Input
                    id="burnRate"
                    type="number"
                    placeholder="Burn rate (%)"
                    {...form.register("burnRate")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="transactionTax">
                    Transaction Tax (%)
                  </label>
                  <Input
                    id="transactionTax"
                    type="number"
                    placeholder="Transaction tax (%)"
                    {...form.register("transactionTax")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="presaleDuration">
                    Presale Duration (days)
                  </label>
                  <Input
                    id="presaleDuration"
                    type="number"
                    placeholder="Presale duration in days"
                    {...form.register("presaleDuration")}
                  />
                </div>
              </>
            )}
            {step === 5 && (
              <>
                {!address ? (
                  <Button type="button" onClick={connectWallet}>Connect Wallet</Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm">Connected: {address}</p>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="amount">
                        Deposit Amount ({form.watch("chain") === "solana" ? "SOL" : "ETH"})
                      </label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Amount to deposit"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Button type="button" onClick={deposit}>Deposit</Button>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span>Funding Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} />
                      <div className="flex justify-between text-sm mt-1">
                        <span>
                          {raised} / {goal} {form.watch("chain") === "solana" ? "SOL" : "ETH"}
                        </span>
                        <span>{timeLeft > 0 ? formatTime(timeLeft) : "Ended"}</span>
                      </div>
                    </div>
                  </div>
                )}
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
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-background border-t border-border/40"
      >
        <div className="container max-w-7xl mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-2">
                <Layers className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">TokenForge</span>
              </Link>
              <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} TokenForge Technologies</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#why-tokenforge" className="hover:text-foreground">
                    Why TokenForge
                  </Link>
                </li>
                <li>
                  <Link href="#live-dashboard" className="hover:text-foreground">
                    Live Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>Powered by Axelar, Solana, and Hyperliquid</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
