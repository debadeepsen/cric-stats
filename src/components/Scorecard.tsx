'use client'

import { InningsScorecard } from '@/types'
import { Tabs } from '@/components/ui/Tabs'
import { BattingScorecard } from './BattingScorecard'
import { BowlingScorecard } from './scorecard/BowlingScorecard'

export const Scorecard = ({ scorecard }: { scorecard: InningsScorecard[] }) => {
  if (!scorecard || scorecard.length === 0) return <p>No scorecard data</p>

  // Build tabs dynamically from innings data
  const inningsTabs = scorecard.map(inn => ({
    label: `${inn.team}`,
    content: (
      <div className='p-4'>
        {/* Batting Table */}
        <h3 className='font-semibold text-xl mb-2'>Batting</h3>
        <BattingScorecard inn={inn} />

        {/* <pre>{JSON.stringify(inn, null, 2)}</pre> */}

        {/* Bowling Table */}
        <h3 className='font-semibold text-xl mb-2'>Bowling</h3>
        <BowlingScorecard inn={inn} />
      </div>
    )
  }))

  return <Tabs tabs={inningsTabs} />
}
