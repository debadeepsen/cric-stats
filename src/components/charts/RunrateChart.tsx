'use client'

import { TEAMS_COLORS } from '@/constants'
import { RunRateData } from '@/utils/types'
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

export const RunRateChart = ({ data }: { data: RunRateData[] }) => {
  if (!data || data.length === 0) return <p>No run rate data</p>

  // merge overs from both innings into one dataset
  const maxOvers = Math.max(...data.map(inn => inn.overs.length))
  const merged: Record<string, any>[] = []

  for (let i = 0; i < maxOvers; i++) {
    const row: any = { over: i + 1 }
    data.forEach(inn => {
      row[inn.team] = inn.overs[i]?.runRate ?? null
    })
    merged.push(row)
  }

  return (
    <div className='w-full h-[400px]'>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          data={merged}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
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
          <Legend verticalAlign='top' />
          {data.map((inn, idx) => (
            <Line
              key={inn.innings}
              type='monotone'
              dataKey={inn.team}
              stroke={TEAMS_COLORS[idx]}
              strokeWidth={3}
              dot={{ r: 0 }}
              name={`${inn.team}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
