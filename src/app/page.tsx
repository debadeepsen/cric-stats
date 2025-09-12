import { HeatmapChart } from '@/components/charts/HeatmapChart'
import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { PartnershipChart } from '@/components/charts/PartnershipChart'
import { RunRateChart } from '@/components/charts/RunrateChart'
import { StrikeRateTabs } from '@/components/charts/StrikeRateChart'
import { WormChart } from '@/components/charts/WormChart'
import { MatchInfo } from '@/components/info/MatchInfo'
import { Scorecard } from '@/components/scorecard/Scorecard'
import { Card } from '@/components/ui/Card'
import {
  getHeatmapData,
  getManhattanData,
  getMatchInfo,
  getMatchSummary,
  getPartnershipData,
  getRunRateData,
  getScorecardData,
  getStrikeRateData,
  getWormData
} from '@/services/apiService'

const Home = async () => {
  const matchInfo = await getMatchInfo()
  const summary = await getMatchSummary()
  const manhattanData = await getManhattanData()
  const scorecardData = await getScorecardData()
  const partnershipData = await getPartnershipData()
  const wormData = await getWormData()
  const heatmapData = await getHeatmapData()
  const runRateData = await getRunRateData()
  const strikeRateData = await getStrikeRateData()

  return (
    <main>
      <div>
        <MatchInfo info={matchInfo} summary={summary} />
      </div>
      <Card>
        <Scorecard scorecard={scorecardData} />
      </Card>
      <div className='flex'>
        <Card>
          <ManhattanChart data={manhattanData} />
        </Card>
      </div>
      <div>
        <Card>
          <h2 className='text-lg font-semibold mb-2'>Heatmap</h2>
          <HeatmapChart data={heatmapData?.heatmap} />
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
      <div className='flex'>
        <Card>
          <h2 className='text-lg font-semibold mb-2'>Over-by-Over Run Rate</h2>
          <RunRateChart data={runRateData.innings} />
        </Card>
      </div>
      <div className='flex'>
        <Card>
          <h2 className='text-lg font-semibold mb-2'>Batting Strike Rates</h2>
          <StrikeRateTabs data={strikeRateData} />
        </Card>
      </div>
      <footer className='my-6 text-center text-xs text-gray-500'>
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
