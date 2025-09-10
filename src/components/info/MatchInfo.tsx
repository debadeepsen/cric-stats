'use client'

type MatchInfoProps = {
  teams: string[]
  toss: { winner: string; decision: string }
  venue: string
  city?: string
  dates: string[]
  matchType: string
  outcome: { winner?: string; by?: any; result?: string }
  officials?: { umpires?: string[]; referee?: string }
}

export const MatchInfo = ({ info }: { info: MatchInfoProps }) => {
  return (
    <div className='p-4 mb-6'>
      <h1 className='text-5xl mb-6'>
        {info.teams[0]} vs {info.teams[1]}
      </h1>

      <p className='text-sm'>
        <span className='font-semibold'> {info.matchType} match at </span>
        {info.venue}
        {info.city ? `, ${info.city}` : ''}
      </p>
      <p className='text-sm'></p>
      <p className='text-sm'>
        <span className='font-semibold'>Dates:</span> {info.dates.join(', ')}
      </p>

      <p className='text-sm'>
        <span className='font-semibold'>Toss:</span> {info.toss.winner} chose to{' '}
        {info.toss.decision}
      </p>

      {info.outcome?.winner ? (
        <p className='text-sm text-green-700 font-semibold'>
          {info.outcome.winner}
          {' won '}
          {info.outcome.by
            ? `by ${Object.values(info.outcome.by)} ${Object.keys(
                info.outcome.by
              )}`
            : ''}
        </p>
      ) : (
        <p className='text-sm'>{info.outcome?.result ?? 'Match in progress'}</p>
      )}

      {info.officials && (
        <div className='mt-2 text-sm'>
          <p>
            <span className='font-semibold'>Umpires:</span>{' '}
            {info.officials.umpires?.join(', ')}
          </p>
          {info.officials.referee && (
            <p>
              <span className='font-semibold'>Referee:</span>{' '}
              {info.officials.referee}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
