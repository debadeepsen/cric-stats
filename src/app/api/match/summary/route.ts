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

    const summary = match.innings.map((inn: any, idx: number) => {
      let totalRuns = 0
      let totalWickets = 0
      let balls = 0

      inn.overs.forEach((over: any) => {
        over.deliveries.forEach((delivery: any) => {
          totalRuns += delivery.runs.total

          if (delivery.wickets) {
            totalWickets += delivery.wickets.length
          }

          const extras = delivery.extras ?? {}
          if (!extras.wides && !extras.noballs) {
            balls++
          }
        })
      })

      const overs = Math.floor(balls / 6) + (balls % 6) / 10

      return {
        innings: idx + 1,
        team: inn.team,
        runs: totalRuns,
        wickets: totalWickets,
        overs: +overs.toFixed(1),
      }
    })

    return NextResponse.json({ summary })
  } catch (err: any) {
    console.error('Error generating match summary:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
