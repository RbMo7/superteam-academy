export type TrackInfo = {
  id: number;
  name: string;
  display: string;
  color: string;
};

export const TRACKS: Record<number, TrackInfo> = {
  0: { id: 0, name: 'standalone', display: 'Standalone Course', color: 'gray' },
  1: { id: 1, name: 'anchor', display: 'Anchor Framework', color: 'blue' },
  2: { id: 2, name: 'rust', display: 'Rust for Solana', color: 'orange' },
  3: { id: 3, name: 'defi', display: 'DeFi Development', color: 'green' },
  4: { id: 4, name: 'security', display: 'Program Security', color: 'red' },
  5: { id: 5, name: 'frontend', display: 'Frontend Development', color: 'purple' },
} as const;

export function getTrack(trackId: number): TrackInfo {
  return TRACKS[trackId] ?? TRACKS[0]!;
}
