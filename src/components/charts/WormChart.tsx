'use client'

import { TEAMS_COLORS } from '@/constants'
import { WormInnings } from '@/types'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

export const WormChart = ({ data }: { data: WormInnings[] }) => {
  if (!data || data.length === 0) return <p>No worm chart data</p>

  // Merge innings into a common dataset by overs
  const maxOvers = Math.max(...data.map(inn => inn.overs.length))
  const merged: Record<string, any>[] = []

  for (let i = 0; i < maxOvers; i++) {
    const row: any = { over: i + 1 }
    data.forEach(inn => {
      row[inn.team] = inn.overs[i]?.cumulative ?? null
    })
    merged.push(row)
  }

  return (
    <div className='w-full h-[500px]'>
      <h2 className='text-lg font-semibold mb-2'>
        Worm Chart (Cumulative Runs)
      </h2>
      <ResponsiveContainer width='100%' height={500}>
        <LineChart
          data={merged}
          margin={{ top: 20, right: 40, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5555' />
          <XAxis
            dataKey='over'
            label={{ value: 'Overs', position: 'insideBottom', offset: -5 }}
            fontSize={12}
          />
          <YAxis
            label={{ value: 'Runs', angle: -90, position: 'insideLeft' }}
            fontSize={12}
          />
          <Tooltip />
          <Legend verticalAlign='top' offset={20} />
          {data.map((inn, index) => (
            <Line
              key={inn.innings}
              type='monotone'
              dataKey={inn.team}
              stroke={TEAMS_COLORS[index]}
              strokeWidth={3}
              dot={false}
              name={`${inn.team}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
