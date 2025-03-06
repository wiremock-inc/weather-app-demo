'use client';

import { useEffect, useState } from 'react';
import { fetchLocationByIp, fetchWeatherData, transformWeatherData } from '../lib/api';
import { WeatherData } from '../lib/types';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

// Fallback location in case IP geolocation fails
const FALLBACK_LOCATION = {
  lat: 51.5074, // London
  lon: -0.1278,
};

/**
 * Weather Tile Component
 * Displays current weather information for the user's location
 */
export default function WeatherTile() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Step 1: Get user's location from IP
        let lat: number;
        let lon: number;
        
        try {
          const locationData = await fetchLocationByIp();
          lat = locationData.lat;
          lon = locationData.lon;
        } catch (error) {
          console.warn('Failed to get location from IP, using fallback location:', error);
          lat = FALLBACK_LOCATION.lat;
          lon = FALLBACK_LOCATION.lon;
          setUsedFallback(true);
        }
        
        // Step 2: Fetch weather data using the coordinates
        const weatherResponse = await fetchWeatherData(lat, lon);
        
        // Step 3: Transform the data for display
        const transformedData = transformWeatherData(weatherResponse);
        
        setWeatherData(transformedData);
      } catch (error) {
        console.error('Failed to load weather data:', error);
        setHasError(true);
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    loadWeatherData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-l-4 border-red-500">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Weather</h2>
        <p className="text-gray-700">{errorMessage || 'Failed to load weather data. Please try again later.'}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {usedFallback && (
        <div className="mb-4 p-2 bg-yellow-50 text-yellow-700 text-sm rounded">
          Note: Using default location (London) as we couldn't detect your location.
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weatherData.location}</h2>
          <p className="text-gray-600">{weatherData.country}</p>
          <p className="text-sm text-gray-500">Last updated: {weatherData.lastUpdated}</p>
        </div>
        {weatherData.conditionIcon && (
          <img 
            src={`https:${weatherData.conditionIcon}`} 
            alt={weatherData.condition} 
            className="w-16 h-16"
            width={64}
            height={64}
          />
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <Thermometer className="text-orange-500 mr-2" size={24} />
          <span className="text-4xl font-bold text-gray-800">{weatherData.temperature}°C</span>
        </div>
        <p className="text-gray-600 ml-8">Feels like {weatherData.feelsLike}°C</p>
        <p className="text-gray-700 font-medium mt-1">{weatherData.condition}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <Wind className="inline-block text-blue-500 mb-1" size={20} />
          <p className="text-sm text-gray-600">Wind</p>
          <p className="font-medium">{weatherData.windSpeed} km/h</p>
          <p className="text-xs text-gray-500">{weatherData.windDirection}</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <Droplets className="inline-block text-blue-500 mb-1" size={20} />
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="font-medium">{weatherData.humidity}%</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <Cloud className="inline-block text-blue-500 mb-1" size={20} />
          <p className="text-sm text-gray-600">Condition</p>
          <p className="font-medium text-xs">{weatherData.condition}</p>
        </div>
      </div>
    </div>
  );
} 