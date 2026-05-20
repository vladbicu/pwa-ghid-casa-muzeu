import { useState, useEffect, useMemo } from 'react';
import { useTenant } from '../config/TenantContext';
import type { Tour, Stop, ToursData, StopsData, Lang, IndustrySection, IndustryData, IntroSlide, IntroData } from '../types';

// In-memory cache: path → parsed JSON
const dataCache = new Map<string, unknown>();

// Module-level stopsMap — populated as side effect of fetching stops,
// so computeTourDuration works without needing stops passed explicitly.
let stopsMap = new Map<string, Stop>();

async function fetchData<T>(path: string, baseUrl: string): Promise<T> {
  if (dataCache.has(path)) {
    return dataCache.get(path) as T;
  }
  const res = await fetch(`${baseUrl}data/${path}.json`);
  if (!res.ok) {
    throw new Error(`Failed to load "${path}": HTTP ${res.status}`);
  }
  const data = (await res.json()) as T;
  dataCache.set(path, data);
  if (path === 'stops') {
    stopsMap = new Map((data as unknown as StopsData).stops.map((s) => [s.id, s]));
  }
  return data;
}

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsyncData<T>(path: string): AsyncState<T> {
  const { baseUrl } = useTenant();
  const [state, setState] = useState<AsyncState<T>>(() => ({
    data: dataCache.has(path) ? (dataCache.get(path) as T) : null,
    loading: !dataCache.has(path),
    error: null,
  }));

  useEffect(() => {
    if (dataCache.has(path)) {
      setState({ data: dataCache.get(path) as T, loading: false, error: null });
      return;
    }
    let cancelled = false;
    fetchData<T>(path, baseUrl)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [path, baseUrl]);

  return state;
}

// --- Data hooks ---

export function useTours(): { data: Tour[] | null; loading: boolean; error: string | null } {
  const { data, loading, error } = useAsyncData<ToursData>('tours');
  return { data: data?.tours ?? null, loading, error };
}

export function useTour(id: string | undefined): { data: Tour | null; loading: boolean } {
  const { data: toursData, loading } = useAsyncData<ToursData>('tours');
  const data = useMemo(() => {
    if (!id || !toursData) return null;
    return toursData.tours.find((t) => t.id === id) ?? null;
  }, [toursData, id]);
  return { data, loading };
}

export function useStops(): { data: Stop[] | null; loading: boolean } {
  const { data, loading } = useAsyncData<StopsData>('stops');
  return { data: data?.stops ?? null, loading };
}

export function useStop(id: string | undefined): { data: Stop | null; loading: boolean } {
  const { data: stopsData, loading } = useAsyncData<StopsData>('stops');
  const data = useMemo(() => {
    if (!id || !stopsData) return null;
    return stopsData.stops.find((s) => s.id === id) ?? null;
  }, [stopsData, id]);
  return { data, loading: !!id && loading };
}

export function useStopsForTour(tour: Tour | null): { data: Stop[]; loading: boolean } {
  const { data: stopsData, loading } = useAsyncData<StopsData>('stops');
  const data = useMemo(() => {
    if (!tour || !stopsData) return [];
    const map = new Map(stopsData.stops.map((s) => [s.id, s]));
    return tour.stopIds.map((id) => map.get(id)).filter((s): s is Stop => s !== undefined);
  }, [stopsData, tour]);
  return { data, loading: !!tour && loading };
}

export function useIndustrySections(): { data: IndustrySection[]; loading: boolean } {
  const { data: industryData, loading } = useAsyncData<IndustryData>('industry');
  return { data: industryData?.sections ?? [], loading };
}

export function useIndustrySection(
  id: string | undefined,
): { data: IndustrySection | null; loading: boolean } {
  const { data: industryData, loading } = useAsyncData<IndustryData>('industry');
  const data = useMemo(() => {
    if (!id || !industryData) return null;
    return industryData.sections.find((s) => s.id === id) ?? null;
  }, [industryData, id]);
  return { data, loading: !!id && loading };
}

// --- Utility hooks (unchanged) ---

export function useStopIndex(
  tour: Tour | null | undefined,
  stopId: string | undefined,
): number {
  return useMemo(() => {
    if (!tour || !stopId) return -1;
    return tour.stopIds.indexOf(stopId);
  }, [tour, stopId]);
}

export function useResumeTour(): ResumeState | null {
  return useMemo(() => {
    const stored = localStorage.getItem(RESUME_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as ResumeState;
    } catch {
      return null;
    }
  }, []);
}

// --- Pure utility functions (unchanged) ---

export function getLocalizedText<T>(
  record: Record<Lang, T> | undefined,
  lang: Lang,
): T | undefined {
  if (!record) return undefined;
  const value = record[lang];
  if (value === '' || (Array.isArray(value) && value.length === 0)) {
    return record['ro'];
  }
  return value ?? record['ro'];
}

function getRoomName(roomId: string): string {
  if (roomId.endsWith('-TIN')) return 'Tindă';
  const match = roomId.match(/-C(\d+)$/);
  if (match) return `Camera ${match[1]}`;
  return roomId;
}

export interface RoomGroup {
  roomId: string;
  roomName: string;
  stops: Stop[];
}

export function groupStopsByRoom(stops: Stop[]): RoomGroup[] {
  const groups = new Map<string, Stop[]>();
  for (const stop of stops) {
    if (!groups.has(stop.roomId)) groups.set(stop.roomId, []);
    groups.get(stop.roomId)!.push(stop);
  }
  return Array.from(groups.entries()).map(([roomId, roomStops]) => ({
    roomId,
    roomName: getRoomName(roomId),
    stops: roomStops,
  }));
}

// Falls back to tour.durationLabel while stopsMap is not yet loaded.
export function computeTourDuration(tour: Tour): string {
  if (stopsMap.size === 0) return tour.durationLabel;
  const totalSeconds = tour.stopIds
    .map((id) => stopsMap.get(id)?.estSeconds ?? 0)
    .reduce((sum, s) => sum + s, 0);
  const totalMins = Math.round(totalSeconds / 60);
  const lo = Math.max(1, Math.round((totalMins * 0.8) / 5) * 5);
  const hi = Math.round((totalMins * 1.2) / 5) * 5;
  return `${lo}–${hi} min`;
}

// --- Resume tour ---

const RESUME_KEY = 'ghid-resume';

export interface ResumeState {
  tourId: string;
  stopId: string;
}

export function saveResume(tourId: string, stopId: string) {
  localStorage.setItem(RESUME_KEY, JSON.stringify({ tourId, stopId }));
}

export function clearResume() {
  localStorage.removeItem(RESUME_KEY);
}

// --- Code-based lookup (used by FindPage) ---

export function findStopByCode(
  code: number,
  stops: Stop[],
  tours: Tour[],
): { stop: Stop; tourId: string } | null {
  const stop = stops.find((s) => s.shortCode === code);
  if (!stop) return null;
  const tour = tours.find((t) => t.stopIds.includes(stop.id));
  if (!tour) return null;
  return { stop, tourId: tour.id };
}

export function findSectionByCode(
  code: number,
  sections: IndustrySection[],
): IndustrySection | null {
  return sections.find((s) => s.shortCode === code) ?? null;
}

export function useIntroSlides(): { data: IntroSlide[] | null; loading: boolean } {
  const { data, loading } = useAsyncData<IntroData>('intro');
  return { data: data?.slides ?? null, loading };
}
