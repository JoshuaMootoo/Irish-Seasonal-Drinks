import { Season } from '../types';

/**
 * Imbolc (Feb 1) → Spring
 * Beltane (May 1) → Summer
 * Lughnasadh (Aug 1) → Autumn
 * Samhain (Nov 1) → Winter
 */
export function getIrishSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Convert to a comparable number (MMDD)
  const mmdd = (month + 1) * 100 + day;

  if (mmdd >= 201 && mmdd < 501) {
    return 'Spring';
  } else if (mmdd >= 501 && mmdd < 801) {
    return 'Summer';
  } else if (mmdd >= 801 && mmdd < 1101) {
    return 'Autumn';
  } else {
    // Nov 1 to Jan 31
    return 'Winter';
  }
}

export function getSeasonFestival(season: Season): string {
  switch (season) {
    case 'Spring': return 'Imbolc';
    case 'Summer': return 'Beltane';
    case 'Autumn': return 'Lughnasadh';
    case 'Winter': return 'Samhain';
  }
}
