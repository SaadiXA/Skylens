
import { GoogleGenAI, Type } from "@google/genai";
import type { WeatherData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const forecastSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.STRING, description: "Day of the week (e.g., 'Monday')." },
        temperature: { type: Type.STRING, description: "Forecasted high/low temperature, e.g., '22°C / 15°C'." },
        airQualityIndex: { type: Type.STRING, description: "Forecasted Air Quality Index and category, e.g., '45 (Good)'." },
        windSpeed: { type: Type.STRING, description: "Forecasted wind speed, e.g., '18 km/h'." },
        cloudiness: { type: Type.STRING, description: "A brief description of cloud cover, e.g., 'Partly Cloudy'." },
        rainfall: { type: Type.STRING, description: "The chance of rainfall as a percentage, e.g., '30%'." },
    },
    required: ["day", "temperature", "airQualityIndex", "windSpeed", "cloudiness", "rainfall"],
};


const weatherSchema = {
    type: Type.OBJECT,
    properties: {
        latitude: { type: Type.NUMBER, description: "The latitude of the location." },
        longitude: { type: Type.NUMBER, description: "The longitude of the location." },
        temperature: { type: Type.STRING, description: "The current temperature in Celsius, e.g., '15°C'" },
        windSpeed: { type: Type.STRING, description: "The current wind speed, e.g., '12 km/h'" },
        precipitation: { type: Type.STRING, description: "The chance of precipitation as a percentage, e.g., '10%'" },
        humidity: { type: Type.STRING, description: "The current humidity level as a percentage, e.g., '65%'" },
        clouds: { type: Type.STRING, description: "The cloud cover percentage, e.g., '75%'" },
        airPressure: { type: Type.STRING, description: "The atmospheric pressure, e.g., '1012 hPa'" },
        airQuality: { type: Type.STRING, description: "The air quality index (AQI) and category, e.g., '55 (Moderate)'" },
        sea: { type: Type.STRING, description: "Sea conditions like wave height or state, e.g., 'Slight, 0.5m waves'" },
        snowCover: { type: Type.STRING, description: "The depth of snow cover, e.g., '0 cm' or '5 cm'" },
        thunderstorms: { type: Type.STRING, description: "The probability of thunderstorms, e.g., 'Low' or 'High'" },
        windGusts: { type: Type.STRING, description: "The speed of wind gusts, e.g., '30 km/h'" },
        forecast: {
            type: Type.ARRAY,
            description: "A 7-day weather forecast.",
            items: forecastSchema,
        },
    },
    required: [
        'latitude', 'longitude', 'temperature', 'windSpeed', 'precipitation', 'humidity', 'clouds', 
        'airPressure', 'airQuality', 'sea', 'snowCover', 'thunderstorms', 'windGusts',
        'forecast'
    ]
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const prompt = `Provide the latitude, longitude, a realistic, detailed weather and atmospheric report, and a 7-day forecast for ${location}. Include all the required fields. For the forecast, provide the day of the week, high/low temperature, a summary of air quality, wind speed, a brief description of cloudiness (e.g., 'Sunny', 'Partly Cloudy'), and the chance of rainfall as a percentage.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: weatherSchema,
        },
    });

    const jsonText = response.text.trim();
    const weatherData = JSON.parse(jsonText) as WeatherData;
    
    // Simple validation
    if (!weatherData.temperature || !weatherData.forecast || weatherData.forecast.length < 7 || weatherData.latitude === undefined || weatherData.longitude === undefined) {
        throw new Error("Invalid data structure received from API");
    }
    
    return weatherData;

  } catch (error) {
    console.error("Error fetching weather data from Gemini API:", error);
    throw new Error("Could not retrieve weather data.");
  }
};