# Weather Dashboard

A simple web application that displays the local weather based on the user's IP address location. The application uses [IP-API](https://ip-api.com/) to determine the user's location and [WeatherAPI.com](https://www.weatherapi.com/) to fetch weather data.

## Features

- Automatic location detection using IP geolocation
- Current weather display including:
  - Temperature (°C)
  - Feels like temperature
  - Weather condition with icon
  - Wind speed and direction
  - Humidity
- Responsive design for all device sizes
- Loading and error states
- WireMock Cloud integration for development and testing

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- Axios for API requests
- Zod for data validation
- Lucide React for icons
- WireMock Cloud for API mocking

## Prerequisites

- Node.js 18.17 or later
- WeatherAPI.com API key (sign up for free at [WeatherAPI.com](https://www.weatherapi.com/))

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy the `.env.local.example` file to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Edit `.env.local` and add your WeatherAPI.com API key:
     ```
     NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
     ```

## Running the Application

### Run the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

In development mode, the application automatically uses WireMock Cloud mock APIs instead of the real APIs. This allows for development and testing without making actual API calls.

### Run with environment variable inline

You can also set the environment variable directly when running the application:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here npm run dev
```

## WireMock Cloud Setup

The application is configured to use WireMock Cloud mock APIs in development mode. The mock APIs are:

1. **IP API** - https://v7437.wiremockapi.cloud
2. **Weather API** - https://2kd6l.wiremockapi.cloud

For more information about the WireMock Cloud setup, see the [wiremock/README.md](./wiremock/README.md) file.

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

For production deployment, make sure to set the `NEXT_PUBLIC_WEATHER_API_KEY` environment variable in your hosting platform.

## Project Structure

- `src/app/` - Next.js application code
  - `components/` - React components
  - `lib/` - Utility functions and API services
  - `page.tsx` - Main page component
  - `layout.tsx` - Root layout component
- `wiremock/` - WireMock Cloud configuration and mappings
  - `mappings/` - JSON files defining the mock API responses
  - `upload-to-wiremock-cloud.sh` - Script to upload mappings to WireMock Cloud

## License

MIT
