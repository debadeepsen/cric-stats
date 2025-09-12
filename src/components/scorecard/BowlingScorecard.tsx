import { InningsScorecard } from '@/utils/types'

export const BowlingScorecard = ({ inn }: { inn: InningsScorecard }) => {
  return (
    <div className='shadow-sm rounded-md border border-gray-200/20 dark:bg-gray-600/10 p-4 mb-6'>
      <div className='flex font-bold justify-end mb-3'>
        {['o', 'm', 'r', 'w', 'e'].map((header, i) => (
          <div
            key={header}
            className={`w-14 text-right ${header === 'e' ? 'pr-3' : ''}`}
          >
            {header.toUpperCase()}
          </div>
        ))}
      </div>
      {/* Rows */}
      {inn.bowling.map(b => (
        <div
          key={b.bowler}
          className='flex justify-between border-b last:border-b-0 border-gray-600/20 text-gray-400 dark:text-gray-50/60 py-1 text-sm'
        >
          <div
            className='flex-1 text-base'
            style={{ color: 'var(--foreground)' }}
          >
            {b.bowler}
          </div>
          <div className='w-14 text-right'>{b.overs}</div>
          <div className='w-14 text-right'>{b.maidens}</div>
          <div className='w-14 text-right'>{b.runs}</div>
          <div className='w-14 text-right pr-1'>{b.wickets}</div>
          <div className='w-14 text-right'>
            {((b.runs ?? 0) / (b.overs ?? 1)).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
