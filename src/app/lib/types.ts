import { z } from 'zod';

// IP API response schema
export const ipApiResponseSchema = z.object({
  status: z.string(),
  country: z.string(),
  countryCode: z.string(),
  region: z.string(),
  regionName: z.string(),
  city: z.string(),
  zip: z.string(),
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  isp: z.string(),
  org: z.string(),
  as: z.string(),
  query: z.string(),
});

export type IpApiResponse = z.infer<typeof ipApiResponseSchema>;

// Weather API response schema
export const weatherApiResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string(),
  }),
  current: z.object({
    last_updated_epoch: z.number(),
    last_updated: z.string(),
    temp_c: z.number(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_degree: z.number(),
    wind_dir: z.string(),
    pressure_mb: z.number(),
    pressure_in: z.number(),
    precip_mm: z.number(),
    precip_in: z.number(),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
    vis_km: z.number(),
    vis_miles: z.number(),
    uv: z.number(),
    gust_mph: z.number(),
    gust_kph: z.number(),
  }),
});

export type WeatherApiResponse = z.infer<typeof weatherApiResponseSchema>;

// Weather display data
export type WeatherData = {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  lastUpdated: string;
}; 