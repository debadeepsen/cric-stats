import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { Partnership } from '@/types'
import { DATA_FILE } from '@/constants'
import { Match } from '@/schema/zod'

// GET /api/partnerships
export async function GET() {
  try {
    // Read JSON file from /public
    const filePath = path.join(process.cwd(), 'public', DATA_FILE)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const match = JSON.parse(fileContents) as Match

    const partnerships: Partnership[] = []

    match.innings.forEach((inn: any, i: number) => {
      let currentBatters: string[] = []
      let runs = 0
      let balls = 0

      inn.overs.forEach((over: any) => {
        over.deliveries.forEach((delivery: any) => {
          const batter = delivery.batter
          const nonStriker = delivery.non_striker

          // Initialize partnership if empty
          if (currentBatters.length === 0) {
            currentBatters = [batter, nonStriker]
          }

          runs += delivery.runs.total
          balls++

          // If a wicket falls, close the partnership
          if (delivery.wickets && delivery.wickets.length > 0) {
            partnerships.push({
              innings: i + 1,
              team: inn.team,
              batters: [...currentBatters] as [string, string],
              runs,
              balls
            })

            // Reset for new partnership
            runs = 0
            balls = 0
            currentBatters = [nonStriker, batter] // NOTE: simplified
          }
        })
      })

      // Push last partnership if not already pushed
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
