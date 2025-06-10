"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function TweetVerifier() {
  const { toast } = useToast()
  const [tweetId, setTweetId] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  async function verify() {
    setLoading(true)
    try {
      const res = await fetch('/api/twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ''}`,
        },
        body: JSON.stringify({ tweetId, username }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed')
      toast({ title: 'Tweet verified!', description: 'Tokens distributed.' })
    } catch (err: any) {
      toast({
        title: 'Verification error',
        description: err.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Tweet ID"
        value={tweetId}
        onChange={(e) => setTweetId(e.target.value)}
      />
      <Button onClick={verify} disabled={loading}>
        Verify Tweet
      </Button>
    </div>
  )
}
