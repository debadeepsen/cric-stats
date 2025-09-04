'use client'

import { InningsScorecard } from '@/types'
import { Tabs } from '@/components/ui/Tabs'

export const Scorecard = ({ scorecard }: { scorecard: InningsScorecard[] }) => {
  if (!scorecard || scorecard.length === 0) return <p>No scorecard data</p>

  // Build tabs dynamically from innings data
  const inningsTabs = scorecard.map(inn => ({
    label: `Innings ${inn.innings}: ${inn.team}`,
    content: (
      <div className='p-4'>
        {/* Batting Table */}
        <h3 className='font-semibold text-xl mb-2'>Batting</h3>
        <div className='shadow-md rounded-md border border-gray-500/20 p-4 mb-6'>
          {inn.batting.map(b => {
            const { batter, balls, runs, out, fours, sixes } = b
            const dismissal =
              { caught: 'c', stumped: 'st', bowled: '' }[out.kind] ?? out.kind
            return (
              <div
                className='flex justify-between border-b last:border-b-2 border-gray-600/20 py-1 text-sm'
                key={b.batter}
              >
                <div className='flex-1 text-base'>{batter}</div>
                <div className='flex flex-1 justify-end space-x-4'>
                  <div className='flex-1 items-center'>
                    {dismissal} {out.fielders?.map(f => f.name).join(',')}
                  </div>
                  <div className='flex-1 items-center'>
                    {out.kind && out.kind !== 'Not out'
                      ? `b ${out.bowler}`
                      : ''}
                  </div>
                  <div className='flex-1 text-right items-center'>
                    {runs !== undefined ? `${runs} (${balls})` : ''}
                  </div>
                </div>
              </div>
            )
          })}
          <div className='flex justify-between font-semibold text-xs mt-6'>
            <div>Extras:</div>
            <div>{inn.totalExtras}</div>
          </div>
          <div className='flex justify-between font-semibold text-lg mt-3'>
            <div>Total:</div>
            <div>
              {inn.batting.reduce((a, c) => a + (c.runs ?? 0), 0) +
                (inn.totalExtras || 0)}
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='w-1/2'></div>
        </div>

        {/* <pre>{JSON.stringify(inn, null, 2)}</pre> */}

        {/* Bowling Table */}
        <h3 className='font-semibold mb-2'>Bowling</h3>
        <table className='w-full border-collapse text-sm'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-2 border'>Bowler</th>
              <th className='p-2 border'>O</th>
              <th className='p-2 border'>R</th>
              <th className='p-2 border'>W</th>
            </tr>
          </thead>
          <tbody>
            {inn.bowling.map(b => (
              <tr key={b.bowler}>
                <td className='p-2 border'>{b.bowler}</td>
                <td className='p-2 border text-center'>{b.overs}</td>
                <td className='p-2 border text-center'>{b.runs}</td>
                <td className='p-2 border text-center'>{b.wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }))

  return <Tabs tabs={inningsTabs} />
}
