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

    const scorecard = match.innings.map((inn, idx) => {
      const team = inn.team

      // Batting summary
      const batting: {
        batter: string
        runs: number
        balls: number
        fours: number
        sixes: number
        out: string
      }[] = []

      const battingStats: Record<string, any> = {}

      inn.overs.forEach(over => {
        over.deliveries.forEach(delivery => {
          const batter = delivery.batter
          const runs = delivery.runs.batter
          const extras = delivery.extras ?? {}

          if (!battingStats[batter]) {
            battingStats[batter] = {
              batter,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              out: 'not out'
            }
          }

          // count legal balls
          if (!extras.wides && !extras.noballs) {
            battingStats[batter].balls++
          }

          battingStats[batter].runs += runs
          if (runs === 4) battingStats[batter].fours++
          if (runs === 6) battingStats[batter].sixes++

          if (delivery.wickets) {
            delivery.wickets.forEach(w => {
              if (w.player_out === batter) {
                battingStats[batter].out = {
                  kind: w.kind,
                  fielders: w.fielders,
                  bowler: delivery.bowler
                }
              }
            })
          }
        })
      })

      Object.values(battingStats).forEach((b: any) => batting.push(b))

      // Bowling summary
      const bowling: {
        bowler: string
        overs: number
        runs: number
        wickets: number
      }[] = []

      const bowlingStats: Record<string, any> = {}

      inn.overs.forEach((over: any) => {
        over.deliveries.forEach((delivery: any) => {
          const bowler = delivery.bowler
          if (!bowlingStats[bowler]) {
            bowlingStats[bowler] = { bowler, balls: 0, runs: 0, wickets: 0 }
          }

          const extras = delivery.extras ?? {}
          bowlingStats[bowler].runs += delivery.runs.total

          if (!extras.wides && !extras.noballs) {
            bowlingStats[bowler].balls++
          }

          if (delivery.wickets) {
            bowlingStats[bowler].wickets += delivery.wickets.length
          }
        })
      })

      Object.values(bowlingStats).forEach((b: any) => {
        b.overs = +(b.balls / 6 + (b.balls % 6) / 10).toFixed(1)
        delete b.balls
        bowling.push(b)
      })

      return { innings: idx + 1, team, batting, bowling }
    })

    return NextResponse.json({ scorecard })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
