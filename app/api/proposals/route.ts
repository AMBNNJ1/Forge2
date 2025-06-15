import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { name, symbol, supply, tokenomics, image, chain } = await req.json()
  if (!name || !symbol || !supply || !chain) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('proposals')
    .insert({
      name,
      symbol,
      supply,
      tokenomics,
      image,
      chain,
      status: 'In funding phase',
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to store proposal' }, { status: 500 })
  }

  return NextResponse.json({ proposal: data })
}
