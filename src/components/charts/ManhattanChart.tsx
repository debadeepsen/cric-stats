'use client'

import { TEAMS_COLORS } from '@/constants'
import { InningsData } from '@/utils/types'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from 'recharts'
import { ChartGrid } from '../ui/ChartGrid'

type OverRow = {
  over: number
  [team: string]: number
}

export const ManhattanChart = ({ data }: { data: InningsData[] }) => {
  if (data.length === 0) return <p>Loading chart...</p>

  // Collect team names
  const teams = data.map(d => d.team)

  // Find max overs across both innings
  const maxOvers = Math.max(...data.map(inn => inn.overs.length))

  // Build unified dataset: { over, team1Runs, team2Runs }
  const chartData: OverRow[] = []
  for (let i = 0; i < maxOvers; i++) {
    const row: OverRow = { over: i + 1 }
    data.forEach(inn => {
      row[inn.team] = inn.overs[i]?.runs || 0
    })
    chartData.push(row)
  }

  return (
    <div className='w-full h-[400px]'>
      <h2 className='text-lg font-semibold mb-2'>Manhattan Chart</h2>
      <ResponsiveContainer width='100%' height={360}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        >
          <ChartGrid />
          <XAxis
            dataKey='over'
            label={{ value: 'Overs', position: 'insideBottom', offset: -10 }}
            fontSize={12}
          />
          <YAxis
            label={{ value: 'Runs', angle: -90, position: 'insideLeft', offset: 10 }}
            fontSize={12}
          />
          <Tooltip />
          <Legend verticalAlign='top' offset={20} />

          {/* One <Bar> per team */}
          {teams.map((team, idx) => (
            <Bar
              key={team}
              dataKey={team}
              fill={TEAMS_COLORS[idx]}
              name={team}
              radius={[4, 4, 0, 0]}
            >
              <LabelList dataKey={team} fontSize={10} position='top' />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      <BarChart data={[1, 2, 3]}></BarChart>
    </div>
  )
}
