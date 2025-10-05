
import type { ReactNode } from 'react';

export interface WeatherMetric {
    name: string;
    key: keyof WeatherData;
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
}
