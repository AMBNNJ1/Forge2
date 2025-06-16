import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, symbol, supply, tokenomics, image, chain } = await req.json()
  if (!name || !symbol || !supply || !chain) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const data = {
    id: 'placeholder-id',
    name,
    symbol,
    supply,
    tokenomics,
    image,
    chain,
    status: 'In funding phase',
  }

  return NextResponse.json({ proposal: data })
}
