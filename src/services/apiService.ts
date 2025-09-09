import { BallHeatmap, InningsData, InningsPartnership, WormInnings } from '@/types'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cric-stats-ds.vercel.app' //Vercel URL

export const getManhattanData = async () => {
  const data = await fetch(
    `${baseUrl}/api/match/manhattan`
  ).then(res => res.json())
  return data.innings as InningsData[]
}

export const getScorecardData = async () => {
  const res = await fetch(
    `${baseUrl}/api/match/scorecard`,
    {
      cache: 'no-store'
    }
  )
  const { scorecard } = await res.json()
  return scorecard as any[]
}

export const getPartnershipData = async () => {
  const res = await fetch(
    `${baseUrl}/api/match/partnerships`,
    {
      cache: 'no-store'
    }
  )
  const partnerships = await res.json()
  return partnerships as { innings: InningsPartnership[] }
}

export const getWormData = async () => {
  const res = await fetch(
    `${baseUrl}/api/match/worm`,
    {
      cache: 'no-store'
    }
  )
  const data = await res.json()
  return data as { worm: WormInnings[] }
}

export const getHeatmapData = async () => {
  const res = await fetch(
    `${baseUrl}/api/match/heatmap`,
    {
      cache: 'no-store'
    }
  )
  const data = await res.json()
  return data as { heatmap: BallHeatmap[] }
}
