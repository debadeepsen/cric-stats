'use client'

import { TEAMS_COLORS } from '@/constants'
import { MatchInfoProps, MatchSummary } from '@/utils/types'
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

  const getInfoLine = (s: MatchSummary) =>
    `${s.team}: ${s.runs}/${s.wickets} (${s.overs} ov)`
  const getLength = (index: number) => getInfoLine(summary[index]).length
  const maxWidth = Math.max(getLength(0), getLength(1)) * 7

  return (
    <div className='w-full overflow-hidden mb-6'>
      {/* Header */}
      <div className='px-6 py-4'>
        <h1 className='text-4xl font-bold mb-4'>
          <span style={{ color: TEAMS_COLORS[0] }}>{info.teams[0]}</span>{' '}
          <span className='font-normal'>vs</span>{' '}
          <span style={{ color: TEAMS_COLORS[1] }}>{info.teams[1]}</span>
        </h1>
        <p className='text-xs mt-1'>
          {info.matchType} • {info.venue}
          {info.city ? `, ${info.city}` : ''} •{' '}
          {info.dates.map(formatDate).join(', ')}
        </p>
      </div>

      {/* Score summary */}
      <div className='flex gap-2 h-12 items-center px-6 py-4 text-sm space-y-1'>
        {summary.map((s, i) => {
          return (
            <p
              key={s.innings}
              className='font-medium p-2 rounded-sm'
              style={{
                color: TEAMS_COLORS[i],
                background: TEAMS_COLORS[i] + '22',
                width: maxWidth
              }}
            >
              {getInfoLine(s)}
            </p>
          )
        })}
      </div>

      {/* Outcome / Status */}
      <div className='px-6 py-3 text-sm'>
        <span className='font-medium'>Toss:</span> {info.toss.winner} chose to{' '}
        {info.toss.decision}
      </div>
      <div className='px-6 py-0 mb-6 text-sm'>{renderOutcome()}</div>

      {/* Details */}
      <div className='px-6 py-4 space-y-2 text-sm'>
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
