import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { Match } from '@/schema/zod'
import { DATA_FILE } from '@/constants'

export async function GET() {
  try {
    // Load JSON from public
    const filePath = path.join(process.cwd(), 'public', DATA_FILE)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const match = JSON.parse(fileContents) as Match

    const inningsData: {
      team: string
      overs: { over: number; runs: number; wickets: number }[]
    }[] = []

    match.innings.forEach((inn: any) => {
      const oversAgg: { over: number; runs: number; wickets: number }[] = []

      inn.overs.forEach((over: any) => {
        let totalRuns = 0
        let totalWickets = 0

        over.deliveries.forEach((delivery: any) => {
          totalRuns += delivery.runs.total
          if (delivery.wickets) {
            totalWickets += delivery.wickets.length
          }
        })

        oversAgg.push({
          over: over.over + 1, // convert 0-based index to 1-based
          runs: totalRuns,
          wickets: totalWickets
        })
      })

      inningsData.push({
        team: inn.team,
        overs: oversAgg
      })
    })

    return NextResponse.json({ innings: inningsData })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
