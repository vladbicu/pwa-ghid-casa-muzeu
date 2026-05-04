import { useMemo } from 'react';
import toursData from '../data/tours.json';
import stopsData from '../data/stops.json';
import type { Tour, Stop, ToursData, StopsData, Lang } from '../types';

const { tours } = toursData as ToursData;
const { stops } = stopsData as StopsData;

const stopsMap = new Map<string, Stop>(stops.map((s) => [s.id, s]));

export function useTours() {
  return tours;
}

export function useTour(tourId: string | undefined) {
  return useMemo(() => {
    if (!tourId) return null;
    return tours.find((t) => t.id === tourId) || null;
  }, [tourId]);
}

export function useStops() {
  return stops;
}

export function useStopsForTour(tour: Tour | null | undefined) {
  return useMemo(() => {
    if (!tour) return [];
    return tour.stopIds
      .map((id) => stopsMap.get(id))
      .filter((s): s is Stop => s !== undefined);
  }, [tour]);
}

export function useStop(stopId: string | undefined) {
  return useMemo(() => {
    if (!stopId) return null;
    return stopsMap.get(stopId) || null;
  }, [stopId]);
}

export function useStopIndex(tour: Tour | null | undefined, stopId: string | undefined) {
  return useMemo(() => {
    if (!tour || !stopId) return -1;
    return tour.stopIds.indexOf(stopId);
  }, [tour, stopId]);
}

export function getLocalizedText<T>(
  record: Record<Lang, T> | undefined,
  lang: Lang
): T | undefined {
  if (!record) return undefined;
  const value = record[lang];
  if (value === '' || (Array.isArray(value) && value.length === 0)) {
    return record['ro'];
  }
  return value ?? record['ro'];
}

// --- Room grouping ---

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

// --- Dynamic duration ---

export function computeTourDuration(tour: Tour): string {
  const totalSeconds = tour.stopIds
    .map((id) => stopsMap.get(id)?.estSeconds ?? 0)
    .reduce((sum, s) => sum + s, 0);
  const totalMins = Math.round(totalSeconds / 60);
  const lo = Math.max(1, Math.round(totalMins * 0.8 / 5) * 5);
  const hi = Math.round(totalMins * 1.2 / 5) * 5;
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
