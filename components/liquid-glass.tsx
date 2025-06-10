"use client"

import * as React from "react"
import { useEffect, useRef, useState, useImperativeHandle } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ className, children, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement)
  const shouldReduce = useReducedMotion()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    if (shouldReduce) return
    const el = localRef.current
    if (!el) return
    function handleMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setTilt({ x: y * 10, y: -x * 10 })
    }
    function reset() {
      setTilt({ x: 0, y: 0 })
    }
    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", reset)
    return () => {
      el.removeEventListener("pointermove", handleMove)
      el.removeEventListener("pointerleave", reset)
    }
  }, [shouldReduce])

  function createRipple(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((r) => [...r, { x, y, id }])
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600)
  }

  return (
    <motion.div
      ref={localRef}
      onClick={createRipple}
      style={{ rotateX: tilt.x, rotateY: tilt.y }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-6 backdrop-blur-xl shadow-lg",
        "transition-transform ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        className
      )}
      initial={false}
      animate={
        shouldReduce
          ? undefined
          : { scale: [1, 1.02, 1], opacity: [1, 0.95, 1] }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="glass-layer absolute inset-0 bg-white/40" // 40% opacity
          style={{ transform: `translate(${tilt.y * -0.5}px, ${tilt.x * -0.5}px)` }}
        />
        <div
          className="glass-layer absolute inset-4 bg-white/20" // 20% opacity
          style={{ transform: `translate(${tilt.y * -1}px, ${tilt.x * -1}px)` }}
        />
        <div
          className="glass-layer absolute inset-8 bg-white/10" // 10% opacity
          style={{ transform: `translate(${tilt.y * -1.5}px, ${tilt.x * -1.5}px)` }}
        />
      </div>
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{ left: r.x, top: r.y }}
          className="liquid-ripple absolute h-5 w-5 bg-white/20 animate-ripple"
        />
      ))}
      <div className="relative z-10 flex flex-col items-center text-sm text-foreground">
        {children}
      </div>
    </motion.div>
  )
})

LiquidGlass.displayName = "LiquidGlass"

export default LiquidGlass
