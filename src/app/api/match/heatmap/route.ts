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

    const heatmap: any[] = []

    match.innings.forEach(innings => {
      const series: { name: string; data: number[] }[] = []

      const longestOver = Math.max(
        ...innings.overs.map(o => o.deliveries?.length)
      )

      for (let i = 0; i < longestOver; i++) {
        series.push({
          name: (i + 1).toString(),
          data: innings.overs.map(o => o.deliveries[i]?.runs.total)
        })
      }

      heatmap.push({ team: innings.team, series })
    })

    return NextResponse.json({ heatmap })
  } catch (err: any) {
    console.error('Error generating heatmap data:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
