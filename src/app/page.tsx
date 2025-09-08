import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { PartnershipChart } from '@/components/charts/PartnershipChart'
import { WormChart } from '@/components/charts/WormChart'
import { Scorecard } from '@/components/scorecard/Scorecard'
import { Card } from '@/components/ui/Card'
import {
  getManhattanData,
  getPartnershipData,
  getScorecardData,
  getWormData
} from '@/services/apiService'
import { de } from 'zod/locales'

const Home = async () => {
  if (!process.env.VERCEL) return <div>Awaiting deployment...</div>

  const manhattanData = await getManhattanData()
  const scorecardData = await getScorecardData()
  const partnershipData = await getPartnershipData()
  const wormData = await getWormData()

  return (
    <main>
      <Card>
        <Scorecard scorecard={scorecardData} />
      </Card>
      <div className='flex'>
        <Card>
          <ManhattanChart data={manhattanData} />
        </Card>
      </div>
      <div className='flex'>
        <Card>
          <h2 className='text-lg font-semibold mb-2'>Partnerships</h2>
          <PartnershipChart innings={partnershipData?.innings} />
        </Card>
        <Card>
          <WormChart data={wormData?.worm} />
        </Card>
      </div>
      <footer className='mt-6 text-center text-xs text-gray-500'>
        Favicon from{' '}
        <a
          target='_blank'
          href='https://www.flaticon.com/free-icons/cricket-ball'
          title='cricket ball icons'
        >
          Cricket ball icons created by Aranagraphics - Flaticon
        </a>
      </footer>
    </main>
  )
}

export default Home
