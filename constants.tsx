
import React from 'react';
import type { WeatherMetric } from './types';

// SVG Icons as React Components
export const TemperatureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2v12m-4-6.5h8M8 12.5h8M8 8.5h8" />
  </svg>
);
export const WindSpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
  </svg>
);
export const PrecipitationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.25-9.98A4.002 4.002 0 0013 3a4 4 0 100 8h-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17l-1 2m-1-2l-1 2m4-2l1 2" />
  </svg>
);
export const HumidityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.272l-5.09-5.09A7 7 0 1118.91 13.18l-5.09 5.09a1 1 0 01-1.414 0z" clipRule="evenodd" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
export const CloudsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.25-9.98A4.002 4.002 0 0013 3a4 4 0 100 8h-1" />
  </svg>
);
export const AirPressureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
export const AirQualityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
export const SeaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M10 4l4 16" />
    <path d="M 3 12 q 4 -4 8 0 t 8 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
export const SnowCoverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.09 2.22 2.22 1.09-2.22 1.09L12 8.62l-1.09-2.22-2.22-1.09 2.22-1.09L12 2zM12 22l1.09-2.22 2.22-1.09-2.22-1.09L12 15.38l-1.09 2.22-2.22 1.09 2.22 1.09L12 22zM2 12l2.22 1.09 1.09 2.22-1.09 2.22L2 12zM22 12l-2.22-1.09-1.09-2.22 1.09-2.22L22 12z" />
  </svg>
);
export const ThunderstormsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    <path d="M 18 4 l -2 2" />
    <path d="M 6 18 l -2 2" />
  </svg>
);
export const WindGustsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);


export const WEATHER_METRICS: WeatherMetric[] = [
  { name: 'Temperature', key: 'temperature', icon: <TemperatureIcon />, color: 'bg-orange-500' },
  { name: 'Wind speed', key: 'windSpeed', icon: <WindSpeedIcon />, color: 'bg-cyan-500' },
  { name: 'Precipitation', key: 'precipitation', icon: <PrecipitationIcon />, color: 'bg-blue-500' },
  { name: 'Humidity', key: 'humidity', icon: <HumidityIcon />, color: 'bg-indigo-500' },
  { name: 'Clouds', key: 'clouds', icon: <CloudsIcon />, color: 'bg-gray-500' },
  { name: 'Air pressure', key: 'airPressure', icon: <AirPressureIcon />, color: 'bg-pink-500' },
  { name: 'Air quality', key: 'airQuality', icon: <AirQualityIcon />, color: 'bg-green-500' },
  { name: 'Sea', key: 'sea', icon: <SeaIcon />, color: 'bg-teal-500' },
  { name: 'Snow cover', key: 'snowCover', icon: <SnowCoverIcon />, color: 'bg-sky-500' },
  { name: 'Thunderstorms', key: 'thunderstorms', icon: <ThunderstormsIcon />, color: 'bg-yellow-500' },
  { name: 'Wind gusts', key: 'windGusts', icon: <WindGustsIcon />, color: 'bg-emerald-500' },
];
