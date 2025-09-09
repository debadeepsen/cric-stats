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

    const innings = match.innings.map((inn: any, idx: number) => {
      let cumulativeRuns = 0
      const overs = inn.overs.map((over: any, i: number) => {
        let overRuns = 0
        over.deliveries.forEach((delivery: any) => {
          overRuns += delivery.runs.total
        })

        cumulativeRuns += overRuns
        const oversSoFar = i + 1
        const cumulativeRunRate = cumulativeRuns / oversSoFar

        return {
          over: i + 1,
          runRate: +cumulativeRunRate.toFixed(2), // return cumulative RR
        }
      })

      return {
        innings: idx + 1,
        team: inn.team,
        overs,
      }
    })

    return NextResponse.json({ innings })
  } catch (err: any) {
    console.error('Error generating run rate data:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
