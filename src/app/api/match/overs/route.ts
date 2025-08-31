import { DATA_FILE } from '@/constants'
import { Match } from '@/schema/zod'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Example GET handler for match overs API
export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', DATA_FILE)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const match = JSON.parse(fileContents) as Match
  const oversData = match.innings[0].overs.map(o => {
    return {
      bowler: o.deliveries[0].bowler,
      runs: o.deliveries.map(d => d.runs.total),
      totalRuns: o.deliveries.reduce((acc, d) => acc + d.runs.total, 0)
    }
  })

  return NextResponse.json({ overs: oversData })
}
