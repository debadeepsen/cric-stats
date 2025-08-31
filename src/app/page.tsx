import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { Scorecard } from '@/components/Scorecard'
import { getManhattanData, getScorecardData } from '@/services/apiService'
import { OverData } from '@/types'

const Home = async () => {
  const manhattanData = await getManhattanData()
  const scorecardData = await getScorecardData()

  return (
    <div className='mt-20 px-8'>
      {/* <Scorecard scorecard={scorecardData} /> */}
      <hr/>
      <ManhattanChart data={manhattanData} />
    </div>
  )
}

export default Home
