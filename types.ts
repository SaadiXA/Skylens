
import type { ReactNode } from 'react';

export interface WeatherMetric {
    name: string;
    // FIX: The type for 'key' was too broad (`keyof WeatherData`), allowing 'forecast', which is an array.
    // This caused a type error in `WeatherGrid.tsx` when passing the value to `WeatherCard`, which expects a string or number.
    // `Exclude` is used to remove 'forecast' from the possible keys.
    key: Exclude<keyof WeatherData, 'forecast'>;
    icon: ReactNode;
    color: string;
}

export interface ForecastDay {
  day: string;
  temperature: string;
  airQualityIndex: string;
  windSpeed: string;
  cloudiness: string;
  rainfall: string;
}

export interface WeatherData {
    temperature: string;
    windSpeed: string;
    precipitation: string;
    humidity: string;
    clouds: string;
    airPressure: string;
    airQuality: string;
    sea: string;
    snowCover: string;
    thunderstorms: string;
    windGusts: string;
    forecast: ForecastDay[];
    latitude: number;
    longitude: number;
}