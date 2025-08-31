import { ManhattanChart } from '@/components/charts/ManhattanChart'
import { getManhattanData } from '@/services/apiService'
import { OverData } from '@/types'

const Home = async () => {
  const manhattanData = await getManhattanData()

  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <h2>Manhattan Chart</h2>
      <ManhattanChart data={manhattanData} />
    </div>
  )
}

export default Home
