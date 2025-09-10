import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { DATA_FILE } from '@/constants'
import { Match } from '@/schema/zod'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', DATA_FILE)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const match = JSON.parse(fileContents) as Match

    const info = {
      teams: match.info.teams,
      toss: match.info.toss,
      venue: match.info.venue,
      city: match.info.city,
      dates: match.info.dates,
      matchType: match.info.match_type,
      outcome: match.info.outcome,
      officials: match.info.officials,
    }

    return NextResponse.json({ info })
  } catch (err: any) {
    console.error('Error generating match info:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
