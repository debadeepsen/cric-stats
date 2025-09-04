import { InningsScorecard } from '@/types'

export const BattingScorecard = ({ inn }: { inn: InningsScorecard }) => {
  return (
    <div className='shadow-sm rounded-md border border-gray-200/20 dark:bg-gray-600/10 p-4 mb-6'>
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
            <div className='flex flex-1 justify-end text-gray-400 dark:text-gray-50/60'>
              <div className='flex-1 pl-22 items-center'>
                {dismissal} {out.fielders?.map(f => f.name).join(',')}
              </div>
              <div className='flex-1 pl-22 items-center'>
                {out.kind && out.kind !== 'Not out' ? `b ${out.bowler}` : ''}
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
  )
}
