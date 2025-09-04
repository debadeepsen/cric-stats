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

      // Batting summary (unchanged) ...
      const batting: {
        batter: string
        runs?: number
        balls?: number
        fours?: number
        sixes?: number
        out?: {
          kind: string
          fielders?: string[] | undefined
          bowler?: string | undefined
        }
      }[] = match.info.players[team].map(p => ({
        batter: p,
        out: { kind: '' }
      }))

      const battingStats: Record<string, any> = {}
      let totalExtras = 0

      inn.overs.forEach(over => {
        over.deliveries.forEach(delivery => {
          const batter = delivery.batter
          const runs = delivery.runs.batter
          const extras = delivery.extras ?? {}

          totalExtras += delivery.runs.extras || 0

          if (!battingStats[batter]) {
            battingStats[batter] = {
              batter,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0
            }
          }

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
                  kind: w.kind || 'Not out',
                  fielders: w.fielders,
                  bowler: delivery.bowler
                }
              }
            })
          }
        })
      })

      Object.values(battingStats).forEach((b: any) => {
        const player = batting.find(bt => bt.batter === b.batter)
        if (player) {
          Object.assign(player, b)
          if (!player.out?.kind && b.balls > 0) {
            player.out = { kind: 'Not out' }
          }
        }
      })

      // Bowling summary with maidens
      const bowling: {
        bowler: string
        overs: number
        runs: number
        wickets: number
        maidens: number
      }[] = []

      const bowlingStats: Record<string, any> = {}

      inn.overs.forEach((over: any) => {
        let overRuns = 0
        let legalDeliveries = 0

        over.deliveries.forEach((delivery: any) => {
          const bowler = delivery.bowler
          if (!bowlingStats[bowler]) {
            bowlingStats[bowler] = {
              bowler,
              balls: 0,
              runs: 0,
              wickets: 0,
              maidens: 0
            }
          }

          const extras = delivery.extras ?? {}
          bowlingStats[bowler].runs += delivery.runs.total

          if (!extras.wides && !extras.noballs) {
            bowlingStats[bowler].balls++
            legalDeliveries++
          }

          overRuns += delivery.runs.total

          if (delivery.wickets) {
            bowlingStats[bowler].wickets += delivery.wickets.length
          }
        })

        // If bowler bowled this over and gave away 0 runs, count as maiden
        if (legalDeliveries > 0 && overRuns === 0) {
          const bowler = over.deliveries[0].bowler
          bowlingStats[bowler].maidens++
        }
      })

      Object.values(bowlingStats).forEach((b: any) => {
        b.overs = +(b.balls / 6 + (b.balls % 6) / 10).toFixed(1)
        delete b.balls
        bowling.push(b)
      })

      return { innings: idx + 1, team, batting, bowling, totalExtras }
    })

    return NextResponse.json({ scorecard })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
