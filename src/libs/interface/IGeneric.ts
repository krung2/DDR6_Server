export interface IGeneric {
  username: string;
  platform: string;
  ubisoft_id: string;
  uplay_id: string;
  avatar_url_146: string;
  avatar_url_256: string;
  last_updated: string;
  aliases: AliasesEntity[];
  progression: Progression;
  stats: Stats;
}
export interface AliasesEntity {
  username: string;
  last_seen_at: string;
}
export interface Progression {
  level: number;
  lootbox_probability: number;
  total_xp: number;
}
export interface Stats {
  general: General;
  queue: Queue;
  gamemode: Gamemode;
  timestamps: Timestamps;
}
export interface General {
  assists: number;
  barricades_deployed: number;
  blind_kills: number;
  bullets_fired: number;
  bullets_hit: number;
  dbnos: number;
  deaths: number;
  distance_travelled: number;
  draws: number;
  gadgets_destroyed: number;
  games_played: number;
  headshots: number;
  kd: number;
  kills: number;
  losses: number;
  melee_kills: number;
  penetration_kills: number;
  playtime: number;
  rappel_breaches: number;
  reinforcements_deployed: number;
  revives: number;
  suicides: number;
  wins: number;
  wl: number;
}
export interface Queue {
  casual: CasualOrRankedOrOther;
  ranked: CasualOrRankedOrOther;
  other: CasualOrRankedOrOther;
}
export interface CasualOrRankedOrOther {
  deaths: number;
  draws: number;
  games_played: number;
  kd: number;
  kills: number;
  losses: number;
  playtime: number;
  wins: number;
  wl: number;
}
export interface Gamemode {
  bomb: Bomb;
  secure_area: SecureArea;
  hostage: Hostage;
}
export interface Bomb {
  best_score: number;
  games_played: number;
  losses: number;
  playtime: number;
  wins: number;
  wl: number;
}
export interface SecureArea {
  best_score: number;
  games_played: number;
  kills_as_attacker_in_objective: number;
  kills_as_defender_in_objective: number;
  losses: number;
  playtime: number;
  times_objective_secured: number;
  wins: number;
  wl: number;
}
export interface Hostage {
  best_score: number;
  games_played: number;
  losses: number;
  playtime: number;
  extractions_denied: number;
  wins: number;
  wl: number;
}
export interface Timestamps {
  created: string;
  last_updated: string;
}
