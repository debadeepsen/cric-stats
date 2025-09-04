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

    const partnerships: {
      innings: number
      team: string
      batters: [string, string]
      runs: number
      balls: number
    }[] = []

    match.innings.forEach((inn, i) => {
      let currentBatters: string[] = []
      let runs = 0
      let balls = 0

      inn.overs.forEach(over => {
        over.deliveries.forEach(delivery => {
          const batter = delivery.batter
          const nonStriker = delivery.non_striker

          if (currentBatters.length === 0) {
            currentBatters = [batter, nonStriker]
          }

          runs += delivery.runs.total
          balls++

          if (delivery.wickets && delivery.wickets.length > 0) {
            partnerships.push({
              innings: i + 1,
              team: inn.team,
              batters: [...currentBatters] as [string, string],
              runs,
              balls
            })

            runs = 0
            balls = 0
            currentBatters = [nonStriker, batter] // simplified: one stays, one out
          }
        })
      })

      if (runs > 0 && currentBatters.length === 2) {
        partnerships.push({
          innings: i + 1,
          team: inn.team,
          batters: [...currentBatters] as [string, string],
          runs,
          balls
        })
      }
    })

    return NextResponse.json({ partnerships })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
