'use client'

import { MatchInfoProps, MatchSummary } from '@/types'
import { formatDate } from '@/utils/lib'

export const MatchInfo = ({
  info,
  summary
}: {
  info: MatchInfoProps
  summary: MatchSummary[]
}) => {
  const renderOutcome = () => {
    if (info.outcome?.winner) {
      const byKey = info.outcome.by ? Object.keys(info.outcome.by)[0] : ''
      const byValue = info.outcome.by ? Object.values(info.outcome.by)[0] : ''
      return (
        <span className='font-semibold'>
          {info.outcome.winner} won{byKey && ` by ${byValue} ${byKey}`}
        </span>
      )
    }
    return <span>{info.outcome?.result ?? 'Match in progress'}</span>
  }

  return (
    <div className='w-full rounded-lg shadow-sm overflow-hidden mb-6'>
      {/* Header */}
      <div className='px-6 py-4'>
        <h1 className='text-4xl font-bold mb-4'>
          {info.teams[0]} <span className='font-normal'>vs</span>{' '}
          {info.teams[1]}
        </h1>
        <p className='text-sm mt-1'>
          {info.matchType} • {info.venue}
          {info.city ? `, ${info.city}` : ''} •{' '}
          {info.dates.map(formatDate).join(', ')}
        </p>
      </div>

      {/* Outcome / Status */}
      <div className='px-6 py-3 text-sm'>{renderOutcome()}</div>

      {/* Score summary */}
      <div className='px-6 py-4 text-sm space-y-1'>
        {summary.map(s => (
          <p key={s.innings} className='font-medium'>
            {s.team}: {s.runs}/{s.wickets} ({s.overs} ov)
          </p>
        ))}
      </div>

      {/* Details */}
      <div className='px-6 py-4 space-y-2 text-sm'>
        <p>
          <span className='font-medium'>Toss:</span> {info.toss.winner} chose to{' '}
          {info.toss.decision}
        </p>

        {info.officials && (
          <>
            {(info.officials.umpires?.length ?? 0) > 0 && (
              <p>
                <span className='font-medium'>Umpires:</span>{' '}
                {info.officials.umpires?.join(', ')}
              </p>
            )}
            {info.officials.referee && (
              <p>
                <span className='font-medium'>Referee:</span>{' '}
                {info.officials.referee}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
