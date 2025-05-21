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

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- Axios for API requests
- Zod for data validation
- Lucide React for icons

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

### Run with environment variable inline

You can also set the environment variable directly when running the application:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here npm run dev
```

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

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
