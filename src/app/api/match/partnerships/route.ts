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

    const inningsPartnerships: {
      innings: number
      team: string
      partnerships: {
        batters: [string, string]
        runs: number
        balls: number
        batsmen: { name: string; runs: number }[]
        extras: number
      }[]
    }[] = []

    match.innings.forEach((inn: any, i: number) => {
      const partnerships: {
        batters: [string, string]
        runs: number
        balls: number
        batsmen: { name: string; runs: number }[]
        extras: number
      }[] = []

      let currentBatters: string[] = []
      let runs = 0
      let balls = 0
      let batsmanRuns: Record<string, number> = {}
      let extras = 0

      inn.overs.forEach((over: any) => {
        over.deliveries.forEach((delivery: any) => {
          const batter = delivery.batter
          const nonStriker = delivery.non_striker
          const thisRuns = delivery.runs.batter
          const thisExtras = delivery.runs.extras || 0

          if (currentBatters.length === 0) {
            currentBatters = [batter, nonStriker]
            batsmanRuns = {
              [batter]: 0,
              [nonStriker]: 0,
            }
          }

          runs += delivery.runs.total
          balls++
          batsmanRuns[batter] = (batsmanRuns[batter] || 0) + thisRuns
          extras += thisExtras

          if (delivery.wickets && delivery.wickets.length > 0) {
            partnerships.push({
              batters: [...currentBatters] as [string, string],
              runs,
              balls,
              batsmen: Object.entries(batsmanRuns).map(([name, r]) => ({
                name,
                runs: r,
              })),
              extras,
            })

            // Reset for next partnership
            runs = 0
            balls = 0
            extras = 0
            currentBatters = [nonStriker, batter] // simplified assumption
            batsmanRuns = {
              [nonStriker]: batsmanRuns[nonStriker] || 0,
              [batter]: 0,
            }
          }
        })
      })

      if (runs > 0 && currentBatters.length === 2) {
        partnerships.push({
          batters: [...currentBatters] as [string, string],
          runs,
          balls,
          batsmen: Object.entries(batsmanRuns).map(([name, r]) => ({
            name,
            runs: r,
          })),
          extras,
        })
      }

      inningsPartnerships.push({
        innings: i + 1,
        team: inn.team,
        partnerships,
      })
    })

    console.log({ inningsPartnerships })

    return NextResponse.json({ innings: inningsPartnerships })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
