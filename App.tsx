import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherGrid from './components/WeatherGrid';
import ForecastTable from './components/ForecastTable';
import Chatbot from './components/Chatbot';
import { fetchWeatherData } from './services/geminiService';
import type { WeatherData } from './types';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setLocation(query);

    try {
      const data = await fetchWeatherData(query);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. The location might be invalid or there was a network issue. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#020617] text-white font-sans">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-[#0a0f2c] to-slate-900 animated-gradient overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-indigo-600/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
         {/* Shooting Stars */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-6 lg:p-8">
        <Header />
        
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mt-16 text-center">
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
          
          {weatherData ? (
            <>
              <WeatherGrid weatherData={weatherData} />
              {weatherData.forecast && <ForecastTable forecast={weatherData.forecast} />}
            </>
          ) : !loading && (
             <div className="text-center p-8 mt-8 bg-black/10 backdrop-blur-sm rounded-2xl">
                <p className="text-blue-200">Weather data will appear here once you search for a location.</p>
            </div>
          )}
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