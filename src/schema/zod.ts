import { z } from 'zod'

/* ---------- Leaf Schemas ---------- */

export const MetaSchema = z.object({
  data_version: z.string(),
  created: z.string(), // ISO date (e.g., "2024-06-30")
  revision: z.number()
})

export const OfficialsSchema = z.object({
  match_referees: z.array(z.string()),
  reserve_umpires: z.array(z.string()).optional(),
  tv_umpires: z.array(z.string()).optional(),
  umpires: z.array(z.string())
})

export const OutcomeSchema = z.object({
  winner: z.string(),
  by: z.object({
    runs: z.number().optional(),
    wickets: z.number().optional()
  })
})

export const PlayersSchema = z.record(z.string(), z.array(z.string())) // { "India": [...], "South Africa": [...] }

export const RegistrySchema = z.object({
  people: z.record(z.string(), z.array(z.string())) // name -> id
})

export const EventSchema = z.object({
  name: z.string(),
  stage: z.string().optional()
})

export const TossSchema = z.object({
  decision: z.string(), // e.g., "bat" | "field"
  winner: z.string()
})

export const ExtrasSchema = z
  .object({
    wides: z.number().optional(),
    legbyes: z.number().optional(),
    noballs: z.number().optional(),
    byes: z.number().optional(),
    penalties: z.number().optional()
  })
  .strict()

export const RunsSchema = z.object({
  batter: z.number(),
  extras: z.number(),
  total: z.number()
})

export const FielderSchema = z
  .object({
    name: z.string().optional() // sometimes only a name object is present
  })
  .strict()

export const WicketSchema = z.object({
  player_out: z.string(),
  fielders: z.array(FielderSchema).optional(),
  kind: z.string() // e.g., "caught" | "bowled" | "run out" | ...
})

export const ReviewSchema = z.object({
  by: z.string(),
  umpire: z.string(),
  batter: z.string(),
  decision: z.string(), // e.g., "struck down" | "upheld"
  type: z.string() // e.g., "wicket"
})

export const DeliverySchema = z.object({
  batter: z.string(),
  bowler: z.string(),
  non_striker: z.string(),
  runs: RunsSchema,
  extras: ExtrasSchema.optional(),
  wickets: z.array(WicketSchema).optional(),
  review: ReviewSchema.optional()
})

export const OverSchema = z.object({
  over: z.number(), // integer over index (0-based in the file)
  deliveries: z.array(DeliverySchema) // 6–7 (or more with wides/no-balls)
})

export const PowerplaySchema = z.object({
  from: z.number(), // over.ball, represented as decimal in the file (e.g., 0.1, 5.6)
  to: z.number(),
  type: z.string() // e.g., "mandatory"
})

/* ---------- Info / Match Schemas ---------- */

export const InfoSchema = z.object({
  balls_per_over: z.number(), // e.g., 6
  city: z.string().optional(),
  dates: z.array(z.string()), // ISO dates (match days)
  event: EventSchema.optional(),
  gender: z.string(), // "male" | "female" | ...
  match_type: z.string(), // "T20" | "ODI" | ...
  match_type_number: z.number(),
  officials: OfficialsSchema,
  outcome: OutcomeSchema,
  overs: z.number(), // scheduled overs per innings (e.g., 20)
  player_of_match: z.array(z.string()).optional(),
  players: PlayersSchema,
  registry: RegistrySchema.optional(),
  season: z.string(),
  team_type: z.string(), // e.g., "international"
  teams: z.array(z.string()), // [teamA, teamB]
  toss: TossSchema,
  venue: z.string()
})

export const InningsSchema = z.object({
  team: z.string(),
  overs: z.array(OverSchema),
  powerplays: z.array(PowerplaySchema).optional()
})

export const MatchSchema = z.object({
  meta: MetaSchema,
  info: InfoSchema,
  innings: z.array(InningsSchema)
})

/* ---------- Inferred Types ---------- */

export type Meta = z.infer<typeof MetaSchema>
export type Officials = z.infer<typeof OfficialsSchema>
export type Outcome = z.infer<typeof OutcomeSchema>
export type Players = z.infer<typeof PlayersSchema>
export type Registry = z.infer<typeof RegistrySchema>
export type Event = z.infer<typeof EventSchema>
export type Toss = z.infer<typeof TossSchema>
export type Extras = z.infer<typeof ExtrasSchema>
export type Runs = z.infer<typeof RunsSchema>
export type Fielder = z.infer<typeof FielderSchema>
export type Wicket = z.infer<typeof WicketSchema>
export type Review = z.infer<typeof ReviewSchema>
export type Delivery = z.infer<typeof DeliverySchema>
export type Over = z.infer<typeof OverSchema>
export type Powerplay = z.infer<typeof PowerplaySchema>
export type Info = z.infer<typeof InfoSchema>
export type Innings = z.infer<typeof InningsSchema>
export type Match = z.infer<typeof MatchSchema>

/* ---------- Example usage ---------- */

// const data: Match = MatchSchema.parse(jsonFromSomewhere);
