import { Match } from '@/schema/zod'
import { NextRequest, NextResponse } from 'next/server'

// Example GET handler for match overs API
export async function GET(req: NextRequest) {
  const data = await fetch('http://localhost:4000/1415755.json').then(res =>
    res.json()
  )
  const match = data as Match
  const info = match.info

  return NextResponse.json({ info })
}
