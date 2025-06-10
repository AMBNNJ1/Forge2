import { NextRequest, NextResponse } from 'next/server';
import { verifyTweet } from '@/lib/twitter';
import { distributeTokens } from '@/lib/token-distribution';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;
const requests = new Map<string, { count: number; timestamp: number }>();

function rateLimit(key: string): boolean {
  const current = requests.get(key);
  const now = Date.now();
  if (!current || now - current.timestamp > RATE_LIMIT_WINDOW) {
    requests.set(key, { count: 1, timestamp: now });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }
  current.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth || auth !== `Bearer ${process.env.API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = req.ip ?? 'unknown';
  if (rateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const { tweetId, username } = await req.json();
  if (!tweetId || !username) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const bearer = process.env.TWITTER_BEARER_TOKEN;
  if (!bearer) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const valid = await verifyTweet({ tweetId, username }, bearer);
  if (!valid) {
    return NextResponse.json({ error: 'Tweet verification failed' }, { status: 400 });
  }

  await distributeTokens(username);
  return NextResponse.json({ success: true });
}
