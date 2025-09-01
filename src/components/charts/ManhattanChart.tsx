'use client'

import { InningsData } from '@/types'
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
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5555' />
          <XAxis
            dataKey='over'
            label={{ value: 'Overs', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Runs', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />

          {/* One <Bar> per team */}
          {teams.map((team, idx) => (
            <Bar
              key={team}
              dataKey={team}
              fill={idx === 0 ? '#60a5fa' : '#4ade80'} // green / blue
              name={team}
              radius={[4, 4, 0, 0]}
            >
              <LabelList dataKey={team} position='top' />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      <BarChart data={[1,2,3]}></BarChart>
    </div>
  )
}
