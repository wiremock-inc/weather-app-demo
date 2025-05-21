import axios from 'axios';
import { IpApiResponse, WeatherApiResponse, ipApiResponseSchema, weatherApiResponseSchema, WeatherData } from './types';

// Base URLs for the APIs
const IP_API_BASE_URL = 'http://ip-api.com';
const WEATHER_API_BASE_URL = 'https://6ry84.wiremockapi.cloud';

/**
 * Fetches the user's location data based on their IP address
 */
export async function fetchLocationByIp(): Promise<IpApiResponse> {
  try {
    // Add a timeout to prevent long-hanging requests
    const response = await axios.get(`${IP_API_BASE_URL}/json/`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const validatedData = ipApiResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error('Error fetching location data:', error);
    
    // Provide more detailed error information
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection to location service timed out. Please try again later.');
      }
      if (error.response) {
        throw new Error(`Location service error: ${error.response.status} - ${error.response.statusText}`);
      }
      if (error.request) {
        throw new Error('No response received from location service. Please check your network connection.');
      }
    }
    
    throw new Error('Failed to fetch location data');
  }
}

/**
 * Fetches weather data for the given coordinates
 */
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherApiResponse> {
  // Get API key from environment variable
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Weather API key is not set. Please set the NEXT_PUBLIC_WEATHER_API_KEY environment variable.');
  }
  
  try {
    // Add a timeout to prevent long-hanging requests
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`,
      {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const validatedData = weatherApiResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Provide more detailed error information
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection to weather service timed out. Please try again later.');
      }
      if (error.response) {
        throw new Error(`Weather service error: ${error.response.status} - ${error.response.statusText}`);
      }
      if (error.request) {
        throw new Error('No response received from weather service. Please check your network connection.');
      }
    }
    
    throw new Error('Failed to fetch weather data');
  }
}

/**
 * Transforms the raw weather API response into a more usable format
 */
export function transformWeatherData(data: WeatherApiResponse): WeatherData {
  return {
    location: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    condition: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    windDirection: data.current.wind_dir,
    lastUpdated: data.current.last_updated,
  };
} 