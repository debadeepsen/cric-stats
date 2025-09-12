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

    const strikeRates = match.innings.map((inn: any, idx: number) => {
      const team = inn.team
      const batterStats: Record<
        string,
        {
          name: string
          data: { ball: number; strikeRate: number }[]
          runs: number
          balls: number
        }
      > = {}

      inn.overs.forEach((over: any) => {
        over.deliveries.forEach((delivery: any) => {
          const batter = delivery.batter
          const runs = delivery.runs.batter
          const extras = delivery.extras ?? {}

          if (!batterStats[batter]) {
            batterStats[batter] = { name: batter, data: [], runs: 0, balls: 0 }
          }

          // count only legal balls
          if (!extras.wides && !extras.noballs) {
            batterStats[batter].balls++
            batterStats[batter].runs += runs
            const sr =
              (batterStats[batter].runs / batterStats[batter].balls) * 100
            batterStats[batter].data.push({
              ball: batterStats[batter].balls,
              strikeRate: +sr.toFixed(2)
            })
          } else {
            // extras add runs but not balls
            batterStats[batter].runs += runs
          }
        })
      })

      return {
        innings: idx + 1,
        team,
        batters: Object.values(batterStats)
      }
    })

    return NextResponse.json({ strikeRates })
  } catch (err: any) {
    console.error('Error generating strike rate data:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
