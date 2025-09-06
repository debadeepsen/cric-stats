import { InningsData, InningsPartnership } from '@/types'

export const getManhattanData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/manhattan`
  ).then(res => res.json())
  return data.innings as InningsData[]
}

export const getScorecardData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/scorecard`,
    {
      cache: 'no-store'
    }
  )
  const { scorecard } = await res.json()
  return scorecard as any[]
}

export const getPartnershipData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/partnerships`,
    {
      cache: 'no-store'
    }
  )
  const partnerships = await res.json()
  return partnerships as { innings: InningsPartnership[] }
}
