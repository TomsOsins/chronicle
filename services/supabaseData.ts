import { supabase } from '../lib/supabase';
import { CityData, Ledger } from '../types';

// ── Ledger Operations ──

export async function fetchLedgers(): Promise<Ledger[]> {
  const { data, error } = await supabase
    .from('ledgers')
    .select('id, name, era, cycle')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[supabase] fetchLedgers error:', error);
    return [];
  }
  return data ?? [];
}

export async function upsertLedger(ledger: Ledger, userId: string): Promise<void> {
  const { error } = await supabase.from('ledgers').upsert({
    id: ledger.id,
    user_id: userId,
    name: ledger.name,
    era: ledger.era,
    cycle: ledger.cycle,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('[supabase] upsertLedger error:', error);
}

export async function deleteLedger(ledgerId: string): Promise<void> {
  const { error } = await supabase.from('ledgers').delete().eq('id', ledgerId);
  if (error) console.error('[supabase] deleteLedger error:', error);
}

// ── City Operations ──

export async function fetchCities(): Promise<CityData[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('id, ledger_id, name, data')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[supabase] fetchCities error:', error);
    return [];
  }

  return (data ?? []).map(row => ({
    ...(row.data as Omit<CityData, 'id' | 'ledgerId' | 'name'>),
    id: row.id,
    ledgerId: row.ledger_id,
    name: row.name,
  }));
}

export async function upsertCity(city: CityData, userId: string): Promise<void> {
  const { id, ledgerId, name, ...rest } = city;

  const { error } = await supabase.from('cities').upsert({
    id,
    user_id: userId,
    ledger_id: ledgerId,
    name,
    data: rest,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('[supabase] upsertCity error:', error);
}

export async function deleteCity(cityId: string): Promise<void> {
  const { error } = await supabase.from('cities').delete().eq('id', cityId);
  if (error) console.error('[supabase] deleteCity error:', error);
}

// ── Batch Operations (for migration) ──

export async function batchUpsertLedgers(ledgers: Ledger[], userId: string): Promise<void> {
  const rows = ledgers.map(l => ({
    id: l.id,
    user_id: userId,
    name: l.name,
    era: l.era,
    cycle: l.cycle,
  }));

  const { error } = await supabase.from('ledgers').upsert(rows);
  if (error) console.error('[supabase] batchUpsertLedgers error:', error);
}

export async function batchUpsertCities(cities: CityData[], userId: string): Promise<void> {
  const rows = cities.map(c => {
    const { id, ledgerId, name, ...rest } = c;
    return {
      id,
      user_id: userId,
      ledger_id: ledgerId,
      name,
      data: rest,
    };
  });

  const { error } = await supabase.from('cities').upsert(rows);
  if (error) console.error('[supabase] batchUpsertCities error:', error);
}
