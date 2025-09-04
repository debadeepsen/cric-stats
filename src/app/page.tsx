import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { Scorecard } from '@/components/Scorecard'
import { Card } from '@/components/ui/Card'
import { getManhattanData, getScorecardData } from '@/services/apiService'

const Home = async () => {
  const manhattanData = await getManhattanData()
  const scorecardData = await getScorecardData()

  // console.log('manhattanData:', manhattanData)

  console.log({ scorecardData })

  return (
    <main>
      <Card>
        <Scorecard scorecard={scorecardData} />
      </Card>
      {/* <hr/> */}
      <Card>
        <ManhattanChart data={manhattanData} />
      </Card>

      {/* <div className='h-96 w-full'>
        <TestComp />
      </div>
      <pre>{JSON.stringify(manhattanData, null, 2)}</pre> */}
    </main>
  )
}

export default Home
