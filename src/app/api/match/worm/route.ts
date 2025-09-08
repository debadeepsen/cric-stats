import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { DATA_FILE } from '@/constants'
import { Match } from '@/schema/zod'

// GET /api/worm
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', DATA_FILE)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const match = JSON.parse(fileContents) as Match

    const wormData: {
      innings: number
      team: string
      overs: { over: number; cumulative: number }[]
      wickets: { over: number; cumulative: number; player_out: string }[]
    }[] = []

    match.innings.forEach((inn: any, idx: number) => {
      let cumulative = 0
      const overs: { over: number; cumulative: number }[] = []
      const wickets: { over: number; cumulative: number; player_out: string }[] = []

      inn.overs.forEach((over: any, i: number) => {
        let overRuns = 0
        over.deliveries.forEach((delivery: any) => {
          overRuns += delivery.runs.total
          if (delivery.wickets) {
            delivery.wickets.forEach((w: any) => {
              wickets.push({
                over: i + 1,
                cumulative: cumulative + overRuns,
                player_out: w.player_out,
              })
            })
          }
        })
        cumulative += overRuns
        overs.push({ over: i + 1, cumulative })
      })

      wormData.push({
        innings: idx + 1,
        team: inn.team,
        overs,
        wickets,
      })
    })

    return NextResponse.json({ worm: wormData })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
