
import React from 'react';
import type { ForecastDay } from '../types';
import { TemperatureIcon, AirQualityIcon, WindSpeedIcon, CloudsIcon, PrecipitationIcon } from '../constants';

interface ForecastTableProps {
  forecast: ForecastDay[];
}

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => {
  const headers = [
    { name: 'Day', icon: null },
    { name: 'Temperature', icon: <TemperatureIcon /> },
    { name: 'Air Quality', icon: <AirQualityIcon /> },
    { name: 'Wind', icon: <WindSpeedIcon /> },
    { name: 'Clouds', icon: <CloudsIcon /> },
    { name: 'Rainfall', icon: <PrecipitationIcon /> },
  ];

  return (
    <section className="w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-glow">7-Day Forecast</h2>
        <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                        <tr>
                            {headers.map(header => (
                                <th key={header.name} className="p-4 text-sm font-semibold text-blue-200 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {header.icon ? React.cloneElement(header.icon, { className: 'h-5 w-5' }) : null}
                                        <span>{header.name}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.map((day, index) => (
                            <tr key={index} className="border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/5">
                                <td className="p-4 font-bold text-white whitespace-nowrap">{day.day}</td>
                                <td className="p-4 text-blue-100 whitespace-nowrap">{day.temperature}</td>
                                <td className="p-4 text-blue-100 whitespace-nowrap">{day.airQualityIndex}</td>
                                <td className="p-4 text-blue-100 whitespace-nowrap">{day.windSpeed}</td>
                                <td className="p-4 text-blue-100 whitespace-nowrap">{day.cloudiness}</td>
                                <td className="p-4 text-blue-100 whitespace-nowrap">{day.rainfall}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
};

export default ForecastTable;
