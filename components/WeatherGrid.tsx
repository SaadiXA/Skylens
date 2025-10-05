
import React from 'react';
import WeatherCard from './WeatherCard';
import { WEATHER_METRICS } from '../constants';
import type { WeatherData } from '../types';

interface WeatherGridProps {
  weatherData: WeatherData;
}

const WeatherGrid: React.FC<WeatherGridProps> = ({ weatherData }) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6 text-glow">Current Conditions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {WEATHER_METRICS.map((metric) => (
          <WeatherCard 
            key={metric.key} 
            metric={metric} 
            value={weatherData[metric.key]} 
          />
        ))}
      </div>
    </section>
  );
};

export default WeatherGrid;
