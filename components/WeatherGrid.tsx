import React from 'react';
import WeatherCard from './WeatherCard';
import { WEATHER_METRICS } from '../constants';
import type { WeatherData } from '../types';

interface WeatherGridProps {
  weatherData: WeatherData;
  loading: boolean;
}

const WeatherGrid: React.FC<WeatherGridProps> = ({ weatherData, loading }) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6 text-glow">Current Conditions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {WEATHER_METRICS.map((metric, index) => (
          <div key={metric.key} style={{ animationDelay: `${index * 50}ms` }} className={!loading && weatherData[metric.key] !== '--' ? 'animate-fade-in-up' : ''}>
            <WeatherCard 
              metric={metric} 
              value={weatherData[metric.key]} 
              loading={loading}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherGrid;