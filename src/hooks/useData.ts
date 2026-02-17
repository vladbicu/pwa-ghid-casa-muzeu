import { useMemo } from 'react';
import toursData from '../data/tours.json';
import stopsData from '../data/stops.json';
import type { Tour, Stop, ToursData, StopsData, Lang } from '../types';

// Type assertions for JSON imports
const { tours } = toursData as ToursData;
const { stops } = stopsData as StopsData;

// Create a map for quick stop lookup by ID
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

/**
 * Returns stops for a tour in the order defined by tour.stopIds
 */
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

/**
 * Returns the index of a stop within a tour's stopIds array
 */
export function useStopIndex(tour: Tour | null | undefined, stopId: string | undefined) {
  return useMemo(() => {
    if (!tour || !stopId) return -1;
    return tour.stopIds.indexOf(stopId);
  }, [tour, stopId]);
}

// Helper to get localized text with fallback to Romanian
export function getLocalizedText<T>(
  record: Record<Lang, T> | undefined,
  lang: Lang
): T | undefined {
  if (!record) return undefined;
  const value = record[lang];
  // If the value is empty string or empty array, fallback to 'ro'
  if (value === '' || (Array.isArray(value) && value.length === 0)) {
    return record['ro'];
  }
  return value ?? record['ro'];
}
