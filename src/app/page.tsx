import WeatherTile from './components/WeatherTile';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Local Weather Dashboard
        </h1>
        
        <WeatherTile />
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Weather data provided by{' '}
            <a 
              href="https://www.weatherapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              WeatherAPI.com
            </a>
          </p>
          <p className="mt-1">
            Location data provided by{' '}
            <a 
              href="https://ip-api.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              IP-API.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
