'use client'

import { InningsPartnership } from '@/types'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid,
} from 'recharts'

export const PartnershipChart = ({ innings }: { innings: InningsPartnership[] }) => {
  if (!innings || innings.length === 0) return <p>No partnership data</p>

  return (
    <div className="space-y-12">
      {innings.map((inn) => {
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
            batter2Name: b2?.name || '',
          }
        })

        return (
          <div key={inn.innings}>
            <h2 className="text-lg font-bold mb-4">
              Partnerships – {inn.team} (Innings {inn.innings})
            </h2>

            <ResponsiveContainer width="100%" height={60 * data.length}>
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="id"
                  width={40}
                  tick={false} // Hide ticks
                />
                <Tooltip
                  formatter={(val, key, item) => {
                    if (key === 'batter1') return [`${val} runs`, item.payload.batter1Name]
                    if (key === 'batter2') return [`${val} runs`, item.payload.batter2Name]
                    if (key === 'extras') return [`${val} runs`, 'Extras']
                    return [val, key]
                  }}
                />
                <Bar dataKey="batter1" stackId="a" fill="#f97316" name="Batter 1">
                  <LabelList dataKey="partnership" position="center" fill="#fff" />
                </Bar>
                <Bar dataKey="batter2" stackId="a" fill="#06b6d4" name="Batter 2" />
                <Bar dataKey="extras" stackId="a" fill="#22c55e" name="Extras" />
              </BarChart>
            </ResponsiveContainer>

            {/* Batter labels & extras below each partnership */}
            <div className="space-y-4 mt-2">
              {data.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between text-sm text-gray-700 px-2"
                >
                  <span>
                    {p.batter1Name} <strong>{p.batter1}</strong>
                  </span>
                  <span>Extras: {p.extras}</span>
                  <span>
                    {p.batter2Name} <strong>{p.batter2}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
