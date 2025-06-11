import { NextRequest, NextResponse } from 'next/server';
import { getTokenMetrics } from '@/lib/dashboard';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const chain = searchParams.get('chain');
  if (!address || !chain) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const metrics = await getTokenMetrics(chain, address);
    return NextResponse.json(metrics);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
