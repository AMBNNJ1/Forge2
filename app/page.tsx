"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Layers, GroupIcon, Rocket, ShieldCheck, MessageSquare } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Metrics from "@/components/metrics"
import TrendingTokenCard, { TrendingToken } from "@/components/trending-token-card"
import { tokens } from "@/lib/tokens"
import TokenProposalForm from "@/components/token-proposal-form"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const trendingTokens: TrendingToken[] = tokens.slice(0, 3)

const buttonProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } }

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CrowdLaunch</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Why CrowdLaunch</Link>
            <Link href="#trending" className="hover:text-foreground transition-colors">Trending</Link>
            <Link href="#propose" className="hover:text-foreground transition-colors">Propose</Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="py-24 text-center bg-background"
        >
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight">
              Community-Driven Token Launches
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 text-2xl text-primary font-semibold">
              The Future of Token Launches
            </motion.p>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Pool liquidity with your community to auto-launch tokens on Base or Solana when funding thresholds are met. Built-in anti-rug protection and social sharing included.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <motion.div {...buttonProps}>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="#propose">Propose a Token</Link>
                </Button>
              </motion.div>
              <motion.div {...buttonProps}>
                <Button asChild size="lg" variant="outline">
                  <Link href="#trending">Explore Tokens</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-12">
              <Image src="/heroimage.png" alt="Hero" width={800} height={500} className="mx-auto rounded-xl" />
            </motion.div>
          </div>
        </motion.section>

        <section className="py-16 bg-background">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <Metrics />
          </div>
        </section>

        <motion.section
          id="features"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 bg-background"
        >
          <div className="container mx-auto max-w-5xl px-4 md:px-6 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why Choose CrowdLaunch?
            </motion.h2>
            <motion.p variants={itemVariants} className="mb-12 text-lg text-muted-foreground max-w-3xl mx-auto">
              The first community-driven launchpad with built-in protection and social amplification
            </motion.p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <motion.div variants={itemVariants} className="flex gap-4">
                <GroupIcon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Community Pooling</h3>
                  <p className="text-sm text-muted-foreground">Pool liquidity with your community to reach launch thresholds faster and reduce individual risk.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex gap-4">
                <Rocket className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Auto-Launch</h3>
                  <p className="text-sm text-muted-foreground">Tokens automatically deploy on Base or Solana when funding goals are met. No manual intervention needed.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex gap-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Anti-Rug Protection</h3>
                  <p className="text-sm text-muted-foreground">Built-in liquidity locks, ownership renouncement options, and automatic refunds if goals aren't met.</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex gap-4">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Social Amplification</h3>
                  <p className="text-sm text-muted-foreground">Integrated sharing tools and referral tracking to help your token go viral on social media.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="trending"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 bg-background"
        >
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6">
              Trending Launches
            </motion.h2>
            <motion.p variants={itemVariants} className="text-center text-muted-foreground mb-12">
              Join these community-backed projects before they launch
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              {trendingTokens.map((t) => (
                <motion.div key={t.symbol} variants={itemVariants}>
                  <Link href={`/tokens/${t.symbol.toLowerCase()}`} className="block">
                    <TrendingTokenCard {...t} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/tokens">View All Tokens</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="propose"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 bg-background"
        >
          <div className="container mx-auto max-w-xl px-4 md:px-6 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Propose Your Token
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-8">
              Create the next community-backed token launch
            </motion.p>
            <motion.div variants={itemVariants}>
              <TokenProposalForm />
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
