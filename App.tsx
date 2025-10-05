import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherGrid from './components/WeatherGrid';
import ForecastTable from './components/ForecastTable';
import MapDisplay from './components/MapDisplay';
import Chatbot from './components/Chatbot';
import StarfieldBackground from './components/StarfieldBackground';
import WarningNotification from './components/WarningNotification';
import { fetchWeatherData } from './services/geminiService';
import type { WeatherData, ForecastDay } from './types';

const defaultForecast: ForecastDay[] = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
        day: d.toLocaleDateString('en-US', { weekday: 'long' }),
        temperature: '--',
        airQualityIndex: '--',
        windSpeed: '--',
        cloudiness: '--',
        rainfall: '--',
    };
});

const defaultWeatherData: WeatherData = {
    temperature: '--',
    windSpeed: '--',
    precipitation: '--',
    humidity: '--',
    clouds: '--',
    airPressure: '--',
    airQuality: '--',
    sea: '--',
    snowCover: '--',
    thunderstorms: '--',
    windGusts: '--',
    forecast: defaultForecast,
    latitude: 20, // Start with a nice view of Earth
    longitude: 0,
};

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [warnings, setWarnings] = useState<string[]>([]);

  const checkForWarnings = (data: WeatherData): string[] => {
    const alerts = new Set<string>();
    const aqiRegex = /(\d+)/;

    // Check current air quality
    if (data.airQuality && data.airQuality !== '--') {
        const match = data.airQuality.match(aqiRegex);
        if (match && parseInt(match[0], 10) > 100) {
            alerts.add(`Air Quality Alert: Current conditions are unhealthy for sensitive groups (${data.airQuality}).`);
        }
    }

    // Check current thunderstorms
    if (data.thunderstorms && (data.thunderstorms.toLowerCase().includes('high') || data.thunderstorms.toLowerCase().includes('likely'))) {
        alerts.add(`Severe Weather Alert: High probability of thunderstorms currently.`);
    }

    // Check forecast for upcoming issues
    data.forecast?.forEach(day => {
        // Forecast AQI
        if (day.airQualityIndex && day.airQualityIndex !== '--') {
            const match = day.airQualityIndex.match(aqiRegex);
            if (match && parseInt(match[0], 10) > 100) {
                 alerts.add(`Air Quality Watch: Unhealthy conditions expected in the coming days.`);
            }
        }
        // Forecast severe weather
        if (day.cloudiness && (day.cloudiness.toLowerCase().includes('thunderstorm') || day.cloudiness.toLowerCase().includes('heavy rain'))) {
            alerts.add(`Severe Weather Watch: Potential for thunderstorms or heavy rain on ${day.day}.`);
        }
    });

    return Array.from(alerts);
  };

  const handleSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setLocation(query);
    setWarnings([]);

    try {
      const data = await fetchWeatherData(query);
      setWeatherData(data);
      const newWarnings = checkForWarnings(data);
      setWarnings(newWarnings);
    } catch (err) {
      setError('Failed to fetch weather data. The location might be invalid or there was a network issue. Please try again.');
      setWeatherData({ ...defaultWeatherData, latitude: 0, longitude: 0 }); // Reset data on error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white font-sans">
      <StarfieldBackground />
      <main className="relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-6 lg:p-8">
        <Header />

        <div className="w-full max-w-4xl mt-8 space-y-3 z-20">
            {warnings.map((warning, index) => (
            <WarningNotification 
                key={index} 
                message={warning} 
                onClose={() => setWarnings(prev => prev.filter((_, i) => i !== index))}
            />
            ))}
        </div>
        
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mt-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-glow bg-gradient-to-r from-blue-300 via-white to-cyan-300 text-transparent bg-clip-text">
                Atmospheric Insights, Instantly
            </h1>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl">
                Enter any location to get a detailed, AI-powered weather and atmospheric analysis, including a 7-day forecast.
            </p>
        </div>

        <div className="w-full max-w-2xl mt-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <div className="w-full max-w-6xl mt-12 space-y-12">
          {loading && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-blue-200">Analyzing conditions for {location}...</p>
            </div>
          )}
          {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
          
          <>
            <WeatherGrid weatherData={weatherData} loading={loading} />
            
            {location && !error && (
              <MapDisplay 
                latitude={weatherData.latitude} 
                longitude={weatherData.longitude} 
                loading={loading}
              />
            )}

            <ForecastTable forecast={weatherData.forecast} loading={loading} />
          </>

        </div>
        
        <footer className="w-full max-w-6xl mt-16 mb-8 text-center text-blue-300/70">
            <p>&copy; {new Date().getFullYear()} Skylens Weather. All rights reserved.</p>
        </footer>

        <Chatbot />
      </main>
    </div>
  );
};

export default App;