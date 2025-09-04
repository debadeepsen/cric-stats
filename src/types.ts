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
}

export type InningsScorecard = {
  innings: number
  team: string
  batting: Batter[]
  bowling: Bowler[]
  totalExtras?: number
}
