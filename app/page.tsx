"use client"

import { TableBody } from "@/components/ui/table"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThemeToggle } from "@/components/theme-toggle"
import TweetVerifier from "@/components/tweet-verifier"
import {
  Settings,
  CheckCircle2,
  XCircle,
  Layers,
  Zap,
  ShieldCheck,
  MessageSquare,
  GroupIcon,
  TrendingUp,
  ListChecks,
  Lock,
  FileText,
  Rocket,
  Target,
  Gauge,
  Sparkles,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HeroCard from "@/components/hero-card"
import LaunchModal from "@/components/launch-modal"

const CheckIcon = () => <CheckCircle2 className="h-5 w-5 text-green-500" />
const CrossIcon = () => <XCircle className="h-5 w-5 text-red-500" />

const MotionButton = motion(Button)
const MotionCard = motion(Card)

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const buttonInteractionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
}

export default function TokenForgePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full bg-background border-b border-border/40" // Changed background for seamless integration
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
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative py-24 md:py-40 text-center bg-background" // Ensure hero section also uses bg-background if it's not meant to have a distinct color
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--foreground-rgb),0.05),rgba(var(--background-rgb),0))]"></div>
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 items-center text-center md:text-left">
              <div>
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Deploy Any Token. Any Chain. 60 Seconds.
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground">
                  The complete token creation platform with built-in burn mechanics, liquidity locks, and viral distribution
                  tools. Launch on Solana, Base, or Avalanche without writing a single line of code.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row md:justify-start justify-center gap-4">
                  <LaunchModal>
                    <MotionButton
                      {...buttonInteractionProps}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Launch Your Token, Now <Rocket className="ml-2 h-4 w-4" />
                    </MotionButton>
                  </LaunchModal>
                </motion.div>
              </div>
              <motion.div variants={itemVariants} className="mx-auto md:mx-0">
                <HeroCard />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Problem Hook Section */}
        <motion.section
          id="problem-hook"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background"
        >
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
              The $600 Billion Token Economy Is Broken.
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
              Every 12 minutes, someone loses money to a rug pull. Every day, brilliant projects die because
              token launches are too complex, too expensive, or too risky.
            </motion.p>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
              Forge makes it impossible to fail the wrong way.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-6 flex justify-center">
              <Image
                src="/rugpull.png"
                alt="Rugpull warning"
                width={600}
                height={600}
                className="rounded-xl border border-border/20 shadow-lg object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Three Steps to Token Success Section */}
        <motion.section
          id="how-it-works"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed to bg-background
        >
          <div className="container max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Three Steps to Token Success
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {[
                {
                  icon: Settings,
                  title: "Step 1: Design Your Token",
                  content:
                    "Configure everything in minutes—name, ticker, total supply, and launch chains. Choose from battle-tested mechanics like automatic burns, transaction fees, and time-locked liquidity that protect your community from day one.",
                },
                {
                  icon: Target,
                  title: "Step 2: Choose Your Launch Strategy",
                  content:
                    'Go public instantly, create an exclusive whitelist, or run a presale. Our viral "Tweet-to-Mint" feature turns every social share into token distribution, building your community as you launch.',
                  highlight: true,
                },
                {
                  icon: Sparkles,
                  title: "Step 3: Launch with Full Transparency",
                  content:
                    "Your token goes live with real-time analytics, automatic leaderboard placement, and complete on-chain tracking. Every holder can see burn logs, price movements, and liquidity status in real-time.",
                },
              ].map((item, index) => (
                <MotionCard
                  key={item.title}
                  variants={itemVariants}
                  className={`bg-background border-0 p-6 md:p-8 text-left flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${item.highlight ? "lg:col-span-1 lg:row-span-1 md:pb-12" : "lg:col-span-1"}`} // Changed bg-card to bg-background, added border-0
                >
                  <div className="flex-shrink-0 mb-4">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground flex-grow text-sm md:text-base">{item.content}</p>
                </MotionCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why TokenForge Wins Section */}
        <motion.section
          id="why-tokenforge"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed from bg-secondary/50
        >
          <div className="container max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Why TokenForge Wins
              </motion.h2>
            </div>
            <motion.div
              variants={itemVariants}
              className="overflow-x-auto bg-background border-0 p-6 shadow-lg rounded-lg" // Changed bg-card to bg-background, added border-0
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%] text-base">Feature</TableHead>
                    <TableHead className="text-center text-base text-primary">TokenForge</TableHead>
                    <TableHead className="text-center text-base">Traditional Platforms</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      feature: "Multi-Chain Support",
                      tokenforge: true,
                      traditional: false,
                      details: "Solana, Base, Avalanche",
                    },
                    {
                      feature: "Zero-Code Deployment",
                      tokenforge: true,
                      traditional: false,
                      details: "Complete automation",
                    },
                    {
                      feature: "Advanced Tokenomics",
                      tokenforge: true,
                      traditional: false,
                      details: "Burns, locks, fees built-in",
                    },
                    {
                      feature: "Rug-Pull Protection",
                      tokenforge: true,
                      traditional: false,
                      details: "Enforced LP locks",
                    },
                    {
                      feature: "Viral Distribution",
                      tokenforge: true,
                      traditional: false,
                      details: "Social integration tools",
                    },
                  ].map((item) => (
                    <TableRow key={item.feature}>
                      <TableCell className="font-medium">
                        {item.feature}
                        {item.details && <span className="block text-xs text-muted-foreground">{item.details}</span>}
                      </TableCell>
                      <TableCell className="text-center">{item.tokenforge ? <CheckIcon /> : <CrossIcon />}</TableCell>
                      <TableCell className="text-center">{item.traditional ? <CheckIcon /> : <CrossIcon />}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </div>
        </motion.section>

        {/* Built for Everyone Section */}
        <motion.section
          id="who-is-it-for"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed to bg-background
        >
          <div className="container max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Built for Everyone
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  icon: Lightbulb,
                  title: "Visionary Founders",
                  content: "Transform your idea into a live token in under 60 seconds. No technical team required.",
                },
                {
                  icon: GroupIcon,
                  title: "Web3 Communities",
                  content:
                    "Distribute governance tokens, rewards, or utility tokens with complete transparency and trust.",
                },
                {
                  icon: TrendingUp,
                  title: "Smart Traders",
                  content: "Discover vetted tokens with clear burn mechanisms and guaranteed liquidity locks.",
                },
              ].map((item, index) => (
                <MotionCard
                  key={item.title}
                  variants={itemVariants}
                  className="bg-background border-0 p-6 md:p-8 text-left flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300" // Changed bg-card to bg-background, added border-0
                >
                  <div className="flex-shrink-0 mb-4">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground flex-grow text-sm md:text-base">{item.content}</p>
                </MotionCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Live Launch Intelligence Section */}
        <motion.section
          id="live-dashboard"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed from bg-secondary/50
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Live Launch Intelligence
              </motion.h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <MotionCard
                variants={itemVariants}
                className="bg-background border-0 p-6 md:p-8 shadow-lg" // Changed bg-card to bg-background, added border-0
              >
                <div className="flex items-center mb-4">
                  <Gauge className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Real-Time Token Feed</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Market capitalization tracking",
                    "Active holder analytics",
                    "Burn event monitoring",
                    "Liquidity lock countdowns",
                    "Complete on-chain activity",
                  ].map((itemText, idx) => (
                    <motion.li key={idx} variants={itemVariants} className="flex items-center">
                      <ListChecks className="h-5 w-5 mr-3 text-primary/80 flex-shrink-0" />
                      {itemText}
                    </motion.li>
                  ))}
                </ul>
              </MotionCard>
              <MotionCard
                variants={itemVariants}
                className="bg-background border-0 p-6 md:p-8 shadow-lg" // Changed bg-card to bg-background, added border-0
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "$XTRA", chain: "Base Network", details: "5% supply burned · 30-day LP lock active" },
                    { name: "$NODE", chain: "Avalanche", details: "Presale sold out in 2 minutes" },
                    { name: "$QRT", chain: "Solana", details: "DAO governance distribution live" },
                  ].map((token, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="bg-background p-4 rounded-md border border-border/20" // Using bg-background with a subtle border for inner items
                    >
                      <h4 className="text-lg font-semibold text-foreground">
                        {token.name} – <span className="text-primary">{token.chain}</span>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{token.details}</p>
                    </motion.div>
                  ))}
                </div>
              </MotionCard>
            </div>
          </div>
        </motion.section>

        {/* Security You Can Verify Section */}
        <motion.section
          id="security"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed to bg-background
        >
          <div className="container max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Security You Can Verify
              </motion.h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Audited Smart Contracts",
                  text: "Every token template is security-reviewed and battle-tested.",
                },
                {
                  icon: Lock,
                  title: "Transparent Liquidity Locks",
                  text: "All LP tokens are locked with public unlock schedules—no hidden exits.",
                },
                {
                  icon: CheckCircle2,
                  title: "Verified Presales",
                  text: "Every presale is governed by smart contracts with automatic distribution.",
                },
                {
                  icon: ShieldCheck,
                  title: "Anti-Rug Safeguards",
                  text: "Clear warnings and enforced protections for every launch.",
                },
              ].map((item) => (
                <MotionCard
                  key={item.title}
                  variants={itemVariants}
                  className="bg-background border-0 p-6 flex items-start gap-4 shadow-lg" // Changed bg-card to bg-background, added border-0
                >
                  <div className="flex-shrink-0 mt-1">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </div>
                </MotionCard>
              ))}
            </div>
            <motion.p variants={itemVariants} className="mt-10 text-center text-muted-foreground text-lg">
              Everything is on-chain, verifiable, and publicly traceable.
            </motion.p>
          </div>
        </motion.section>

        {/* Questions Answered Section (FAQs) */}
        <motion.section
          id="faq"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 md:py-24 bg-background" // Changed from bg-secondary/50
        >
          <div className="container max-w-3xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight">
                Questions Answered
              </motion.h2>
            </div>
            <motion.div
              variants={itemVariants}
              className="bg-background border-0 p-2 shadow-lg rounded-lg" // Changed bg-card to bg-background, added border-0
            >
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "Can I really launch without coding?",
                    a: "Absolutely. Our platform handles all technical deployment while you focus on your vision.",
                  },
                  {
                    q: "Is this just for serious projects?",
                    a: "We support everything from weekend experiments to enterprise token ecosystems. Every launch gets the same transparency and security.",
                  },
                  {
                    q: "Can I modify tokenomics after launch?",
                    a: "Yes—adjust burn rates, extend liquidity locks, and modify distribution through your creator dashboard.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`} className="border-b-0 last:border-b-0">
                    <AccordionTrigger className="text-lg font-medium text-left hover:no-underline px-4 py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 px-4 text-base">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </motion.section>

        {/* Your Token Awaits Section (Final CTA) */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 md:py-32 bg-background" // Ensure this section also uses bg-background
        >
          <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tighter">
              Your Token Awaits
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Turn Your Vision Into Reality. Today.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <MotionButton
                {...buttonInteractionProps}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Building Now <Zap className="ml-2 h-4 w-4" />
              </MotionButton>
              <MotionButton {...buttonInteractionProps} size="lg" variant="outline">
                Talk to Our Team <MessageSquare className="ml-2 h-4 w-4" />
              </MotionButton>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-16 bg-background"
        >
          <div className="container max-w-md mx-auto px-4 md:px-6">
            <TweetVerifier />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-background border-t border-border/40" // Changed from bg-secondary/50, added top border for separation
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
