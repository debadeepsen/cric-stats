import {
  BallHeatmap,
  InningsData,
  InningsPartnership,
  RunRateData,
  WormInnings
} from '@/types'

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://cric-stats-ds.vercel.app' //Vercel URL

export const getMatchInfo = async () => {
  const data = await fetch(`${baseUrl}/api/match/info`, { cache: 'no-store' }).then((res) =>
    res.json()
  )
  return data.info as {
    teams: string[]
    toss: { winner: string; decision: string }
    venue: string
    city?: string
    dates: string[]
    matchType: string
    outcome: any
    officials?: any
  }
}

export const getMatchSummary = async () => {
  const data = await fetch(`${baseUrl}/api/match/summary`, { cache: 'no-store' }).then((res) =>
    res.json()
  )
  return data.summary as {
    innings: number
    team: string
    runs: number
    wickets: number
    overs: number
  }[]
}


export const getManhattanData = async () => {
  const data = await fetch(`${baseUrl}/api/match/manhattan`).then(res =>
    res.json()
  )
  return data.innings as InningsData[]
}

export const getScorecardData = async () => {
  const res = await fetch(`${baseUrl}/api/match/scorecard`, {
    cache: 'no-store'
  })
  const { scorecard } = await res.json()
  return scorecard as any[]
}

export const getPartnershipData = async () => {
  const res = await fetch(`${baseUrl}/api/match/partnerships`, {
    cache: 'no-store'
  })
  const partnerships = await res.json()
  return partnerships as { innings: InningsPartnership[] }
}

export const getWormData = async () => {
  const res = await fetch(`${baseUrl}/api/match/worm`, {
    cache: 'no-store'
  })
  const data = await res.json()
  return data as { worm: WormInnings[] }
}

export const getHeatmapData = async () => {
  const res = await fetch(`${baseUrl}/api/match/heatmap`, {
    cache: 'no-store'
  })
  const data = await res.json()
  return data as { heatmap: BallHeatmap[] }
}

export const getRunRateData = async () => {
  const data = await fetch(`${baseUrl}/api/match/runrate`, {
    cache: 'no-store'
  }).then(res => res.json())
  return data as {innings: RunRateData[]}
}
