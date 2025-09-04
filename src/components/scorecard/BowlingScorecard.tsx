import { InningsScorecard } from "@/types"

export const BowlingScorecard = ({ inn }: { inn: InningsScorecard }) => {
  return (
    <div className='shadow-md rounded-md border border-gray-500/20 p-4 mb-6'>
      {/* Rows */}
      {inn.bowling.map(b => (
        <div key={b.bowler} className='flex justify-between border-b last:border-b-0 border-gray-600/20 py-1 text-sm'>
          <div className='flex-1 text-base'>{b.bowler}</div>
          <div className='w-12 text-center'>{b.overs}</div>
          <div className='w-12 text-center'>{b.runs}</div>
          <div className='w-12 text-center'>{b.wickets}</div>
        </div>
      ))}
    </div>
  )
}
