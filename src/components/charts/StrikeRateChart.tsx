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
  return (
    <div className='w-full h-[400px]'>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='#5555' />
          <XAxis
            dataKey='ball'
            type='number'
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
          <Legend verticalAlign='top' offset={-10} />
          {data.batters.map(batter => (
            <Line
              key={batter.name}
              data={batter.data}
              dataKey='strikeRate'
              name={batter.name}
              stroke={stringToColor(batter.name)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
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
      tabs={data.map((inn) => ({
        label: `${inn.team}`,
        content: <StrikeRateChart data={inn} />,
      }))}
    />
  )
}
