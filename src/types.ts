export type Partnership = {
  innings: number
  team: string
  batters: [string, string]
  runs: number
  balls: number
}

export type OverData = {
  over: number
  runs: number
  wickets: number
}

export type InningsData = {
  team: string
  overs: OverData[]
}