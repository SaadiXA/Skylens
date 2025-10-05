
import React from 'react';
import type { WeatherMetric } from '../types';

interface WeatherCardProps {
  metric: WeatherMetric;
  value: string | number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ metric, value }) => {
  return (
    <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:bg-black/20 hover:border-white/20 hover:-translate-y-1 shadow-lg h-full">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${metric.color} shadow-md`}>
                {metric.icon}
            </div>
            <p className="text-base font-semibold text-blue-100">{metric.name}</p>
        </div>
        <div>
            <p className="text-3xl font-bold text-white text-glow">{value ?? '--'}</p>
        </div>
    </div>
  );
};

export default WeatherCard;
