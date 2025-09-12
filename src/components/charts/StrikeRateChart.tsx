'use client'

import { InningsStrikeRate } from '@/utils/types'
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
import { Tabs } from '../ui/Tabs'
import { ChartGrid } from '../ui/ChartGrid'

// deterministic color generator
const stringToColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

export const StrikeRateChart = ({ data }: { data: InningsStrikeRate }) => {
  if (!data || !data.batters || data.batters.length === 0) {
    return <p>No strike rate data</p>
  }

  // find max balls faced by any batter in this innings
  const maxBalls = Math.max(...data.batters.map(b => b.data.length))

  // create a merged dataset: each row is { ball, Batter1: sr, Batter2: sr, ... }
  const merged: Record<string, any>[] = []
  for (let i = 1; i <= maxBalls; i++) {
    const row: Record<string, any> = { ball: i }
    data.batters.forEach(batter => {
      const entry = batter.data.find(d => d.ball === i)
      row[batter.name] = entry ? entry.strikeRate : null
    })
    merged.push(row)
  }

  return (
    <div className='w-full h-[400px]'>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          data={merged}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <ChartGrid />
          <XAxis
            dataKey='ball'
            type='number'
            domain={[1, maxBalls]}
            label={{
              value: 'Balls Faced',
              position: 'insideBottom',
              offset: -5
            }}
          />
          <YAxis
            domain={[0, 'auto']}
            label={{ value: 'Strike Rate', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend verticalAlign='top' />
          {data.batters.map(batter => (
            <Line
              key={batter.name}
              type='monotone'
              dataKey={batter.name}
              stroke={stringToColor(batter.name)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const StrikeRateTabs = ({ data }: { data: InningsStrikeRate[] }) => {
  if (!data || data.length === 0) return <p>No strike rate data</p>

  return (
    <Tabs
      tabs={data.map(inn => ({
        label: `${inn.team}`,
        content: <StrikeRateChart data={inn} />
      }))}
    />
  )
}
