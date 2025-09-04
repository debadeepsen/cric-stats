'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from 'recharts'

type Partnership = {
  innings: number
  team: string
  batters: [string, string]
  runs: number
  balls: number
}

export const PartnershipChart = ({ data }: { data: Partnership[] }) => {
  if (!data || data.length === 0) return <p>No partnership data</p>

  // Format for chart: one bar per partnership
  const formatted = data.map(p => ({
    name: `${p.batters[0]} & ${p.batters[1]} (${p.team})`,
    runs: p.runs,
    balls: p.balls
  }))

  return (
    <div className='w-full h-[500px]'>
      <ResponsiveContainer width='100%' height={500}>
        <BarChart
          layout='vertical'
          data={formatted}
          margin={{ top: 20, right: 40, left: 120, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            type='number'
            label={{ value: 'Runs', position: 'insideBottom', offset: -5 }}
          />
          <YAxis type='category' dataKey='name' width={200} />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'runs') return [`${value} runs`, '']
              return [value, name]
            }}
          />
          <Bar dataKey='runs' fill='#4ade80' name='Runs' radius={[0, 4, 4, 0]}>
            <LabelList dataKey='runs' position='right' />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
