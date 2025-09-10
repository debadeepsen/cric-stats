'use client'

import { InningsPartnership } from '@/types'
import { Tabs } from '../ui/Tabs'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid
} from 'recharts'

const CustomTooltip = ({ active, payload, label }: any) => {
  const data = payload.map((p: any) => p.payload)?.[0]
  
  return !!data ? (
    <div className='bg-white/90 dark:bg-gray-950/90 text-gray-800 dark:text-gray-100 p-2 border border-gray-300/30 shadow-lg'>
      <div><span className='font-semibold'>{data.batter1Name}: </span>{data.batter1}</div>
      <div><span className='font-semibold'>{data.batter2Name}: </span>{data.batter2}</div>
      <div><span className='font-semibold'>{'Extras'}: </span>{data.extras}</div>
    </div>
  ) : null
}

export const PartnershipChart = ({
  innings
}: {
  innings: InningsPartnership[]
}) => {
  if (!innings || innings.length === 0) return <p>No partnership data</p>

  const tabs = innings.map(inn => {
    // format data for recharts stacked bar
    const data = inn.partnerships.map((p, idx) => {
      const b1 = p.batsmen[0]
      const b2 = p.batsmen[1]
      return {
        id: idx + 1,
        partnership: `${p.runs} (${p.balls})`,
        batter1: b1?.runs || 0,
        batter2: b2?.runs || 0,
        extras: p.extras,
        batter1Name: b1?.name || '',
        batter2Name: b2?.name || ''
      }
    })

    const label = inn.team

    const content = (
      <div key={inn.innings}>
        <ResponsiveContainer width='100%' height={50 * data.length}>
          <BarChart
            layout='vertical'
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            barCategoryGap={15}
          >
            <CartesianGrid strokeDasharray='3' stroke='#5555' />
            <XAxis type='number' hide />
            <YAxis type='category' dataKey='id' width={40} tick={false} />
            <Tooltip
              content={CustomTooltip}
            />
            <Bar
              dataKey='batter1'
              stackId='a'
              fill='#ba10ef'
              name={'Batter 1'}
              radius={0}
            ></Bar>
            <Bar dataKey='batter2' stackId='a' fill='#1b46e9' name='Batter 2' />
            <Bar
              dataKey='extras'
              stackId='a'
              fill='#22c55e'
              name='Extras'
            >
              <LabelList
                dataKey={'partnership'}
                fontSize={10}
                position='right'
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )

    return {
      label,
      content
    }
  })

  return (
    <div className='space-y-12'>
      <Tabs tabs={tabs} />
    </div>
  )
}
