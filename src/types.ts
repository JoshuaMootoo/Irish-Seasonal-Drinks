export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
export type Temperature = 'cold' | 'mild' | 'warm';
export type Weather = 'rainy' | 'clear' | 'cloudy' | 'any';

export interface Drink {
  id: string;
  name: string;
  type: string;
  seasons: Season[];
  temperatures: Temperature[];
  weathers: Weather[];
  description: string;
  icon: string;
  why: string;
  howToMake: string[];
  container: {
    name: string;
    reason: string;
  };
}

export interface WeatherData {
  temp: number;
  condition: Weather;
  city: string;
}
