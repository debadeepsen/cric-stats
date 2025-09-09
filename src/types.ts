export type OverData = {
  over: number
  runs: number
  wickets: number
}

export type InningsData = {
  team: string
  overs: OverData[]
}

export type Batter = {
  batter: string
  runs: number
  balls: number
  fours: number
  sixes: number
  out: { kind: string; fielders: { name: string }[]; bowler: string }
}

export type Bowler = {
  bowler: string
  overs: number
  runs: number
  wickets: number
  maidens: number
}

export type InningsScorecard = {
  innings: number
  team: string
  batting: Batter[]
  bowling: Bowler[]
  totalExtras?: number
}

export type Partnership = {
  batters: [string, string]
  runs: number
  balls: number
  batsmen: { name: string; runs: number }[]
  extras: number
}

export type InningsPartnership = {
  innings: number
  team: string
  partnerships: Partnership[]
}

export type WormInnings = {
  innings: number
  team: string
  overs: { over: number; cumulative: number }[]
}

export type HeatmapSeries = {
  name: string
  data: { x: string; y: number }[]
}

export type BallHeatmap = {
  innings: number
  team: string
  series: HeatmapSeries[]
}

export type RunRateData = {
  innings: number
  team: string
  overs: { over: number; runRate: number }[]
}