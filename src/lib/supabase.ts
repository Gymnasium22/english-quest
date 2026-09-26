/**
 * Future Supabase tables (no client is bundled yet):
 * profiles, units, modules, items, exercises, attempts, xp_events, achievements, review_items.
 * When keys exist, read NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * and mirror ProgressState from src/lib/progress.ts. Do not put the service role key in the client.
 */
export type SupabaseProgressRow = {
  user_id: string;
  unit_id: "unit-1-family";
  xp: number;
  payload: unknown;
};
