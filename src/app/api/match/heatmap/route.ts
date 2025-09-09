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

    const heatmap: {
      innings: number
      team: string
      series: { name: string; data: { x: string; y: number }[] }[]
    }[] = []

    match.innings.forEach((inn: any, idx: number) => {
      const seriesMap: Record<number, { name: string; data: { x: string; y: number }[] }> = {}

      inn.overs.forEach((over: any, overIdx: number) => {
        over.deliveries.forEach((delivery: any, dIdx: number) => {
          const runs = delivery.runs.total
          const ballNumber = dIdx + 1 // 1,2,3,...

          if (!seriesMap[ballNumber]) {
            seriesMap[ballNumber] = { name: `${ballNumber}`, data: [] }
          }

          seriesMap[ballNumber].data.push({
            x: `${overIdx + 1}`,
            y: runs,
          })
        })
      })

      heatmap.push({
        innings: idx + 1,
        team: inn.team,
        series: Object.values(seriesMap),
      })
    })

    return NextResponse.json({ heatmap })
  } catch (err: any) {
    console.error('Error generating heatmap data:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
