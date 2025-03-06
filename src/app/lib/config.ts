/**
 * Configuration for API endpoints based on environment
 */

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// WireMock Cloud endpoints
const WIREMOCK_IP_API_URL = 'https://v7437.wiremockapi.cloud';
const WIREMOCK_WEATHER_API_URL = 'https://2kd6l.wiremockapi.cloud';

// Production endpoints
const PROD_IP_API_URL = 'http://ip-api.com';
const PROD_WEATHER_API_URL = 'https://api.weatherapi.com';

// Export the appropriate URLs based on environment
export const IP_API_BASE_URL = isDevelopment ? WIREMOCK_IP_API_URL : PROD_IP_API_URL;
export const WEATHER_API_BASE_URL = isDevelopment ? WIREMOCK_WEATHER_API_URL : PROD_WEATHER_API_URL;

// For debugging
if (isDevelopment) {
  console.log('Using WireMock Cloud APIs in development mode:');
  console.log(`- IP API: ${IP_API_BASE_URL}`);
  console.log(`- Weather API: ${WEATHER_API_BASE_URL}`);
} 