import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { PartnershipChart } from '@/components/PartnershipChart'
import { Scorecard } from '@/components/Scorecard'
import { Card } from '@/components/ui/Card'
import {
  getManhattanData,
  getPartnershipData,
  getScorecardData
} from '@/services/apiService'

const Home = async () => {
  const manhattanData = await getManhattanData()
  const scorecardData = await getScorecardData()
  const partnershipData = await getPartnershipData()

  // console.log('manhattanData:', manhattanData)

  console.log({ scorecardData })

  return (
    <main>
      <Card>
        <Scorecard scorecard={scorecardData} />
      </Card>
      <div className='flex'>
        <Card>
          <ManhattanChart data={manhattanData} />
        </Card>
        <Card>
          <h2 className='text-lg font-semibold mb-2'>Partnerships</h2>
          <PartnershipChart data={partnershipData} />
          {/* <pre>{JSON.stringify(partnershipData, null, 2)}</pre> */}
        </Card>
      </div>
    </main>
  )
}

export default Home
