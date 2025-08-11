import { useState, useEffect } from 'react';

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
  location: string;
}

interface UseWeatherOptions {
  city?: string;
  country?: string;
}

export const useWeather = (options: UseWeatherOptions = {}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { city = 'Kumasi', country = 'Ghana' } = options;
  // Switched to Open-Meteo (no API key required)
  const WEATHER_CODE_MAP: Record<number, { condition: string; icon: string }> = {
    0: { condition: 'Clear', icon: '01d' },
    1: { condition: 'Mainly clear', icon: '02d' },
    2: { condition: 'Partly cloudy', icon: '03d' },
    3: { condition: 'Overcast', icon: '04d' },
    45: { condition: 'Fog', icon: '50d' },
    48: { condition: 'Depositing rime fog', icon: '50d' },
    51: { condition: 'Drizzle', icon: '09d' },
    53: { condition: 'Drizzle', icon: '09d' },
    55: { condition: 'Drizzle', icon: '09d' },
    56: { condition: 'Freezing drizzle', icon: '09d' },
    57: { condition: 'Freezing drizzle', icon: '09d' },
    61: { condition: 'Rain', icon: '10d' },
    63: { condition: 'Rain', icon: '10d' },
    65: { condition: 'Heavy rain', icon: '10d' },
    66: { condition: 'Freezing rain', icon: '10d' },
    67: { condition: 'Freezing rain', icon: '10d' },
    71: { condition: 'Snow', icon: '13d' },
    73: { condition: 'Snow', icon: '13d' },
    75: { condition: 'Heavy snow', icon: '13d' },
    77: { condition: 'Snow grains', icon: '13d' },
    80: { condition: 'Rain showers', icon: '09d' },
    81: { condition: 'Rain showers', icon: '09d' },
    82: { condition: 'Violent rain showers', icon: '09d' },
    85: { condition: 'Snow showers', icon: '13d' },
    86: { condition: 'Snow showers', icon: '13d' },
    95: { condition: 'Thunderstorm', icon: '11d' },
    96: { condition: 'Thunderstorm with hail', icon: '11d' },
    99: { condition: 'Thunderstorm with hail', icon: '11d' },
  };

  const labelDay = (dateStr: string, index: number) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const KUMASI_FALLBACK = { lat: 6.6885, lon: -1.6244, name: 'Kumasi', country: 'Ghana' };

  const geocodeCity = async (city: string, country?: string) => {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to geocode');
      const data = await res.json();
      const results = data?.results as Array<any> | undefined;
      if (!results || results.length === 0) return KUMASI_FALLBACK;

      let match = results[0];
      if (country) {
        const lc = country.toLowerCase();
        match = results.find(r => r.country?.toLowerCase() === lc || r.country_code?.toLowerCase() === lc) || results[0];
      }

      return {
        lat: match.latitude as number,
        lon: match.longitude as number,
        name: (match.name as string) || city,
        country: (match.country as string) || country || '',
      };
    } catch (_) {
      return KUMASI_FALLBACK;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const geo = await geocodeCity(city, country);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current_weather=true&hourly=relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data: any = await res.json();

        // Current weather
        const cw = data.current_weather;
        const map = WEATHER_CODE_MAP[cw?.weathercode as number] || { condition: 'Unknown', icon: '03d' };

        // Humidity from hourly data at current time (fallback to latest available)
        let humidity = 0;
        if (data.hourly?.time && data.hourly?.relative_humidity_2m) {
          const times: string[] = data.hourly.time;
          const rh: number[] = data.hourly.relative_humidity_2m;
          const idx = times.indexOf(cw?.time);
          humidity = Math.round(idx >= 0 ? rh[idx] : rh[rh.length - 1] || 0);
        }

        // Build 3-day forecast (today, tomorrow, next)
        const forecast: WeatherData['forecast'] = [];
        const daily = data.daily;
        if (daily?.time && daily?.weather_code) {
          for (let i = 0; i < Math.min(3, daily.time.length); i++) {
            const code = daily.weather_code[i] as number;
            const m = WEATHER_CODE_MAP[code] || { condition: 'Unknown', icon: '03d' };
            const tMax = daily.temperature_2m_max?.[i] ?? cw?.temperature;
            const tMin = daily.temperature_2m_min?.[i] ?? cw?.temperature;
            const avg = Math.round(((tMax ?? 0) + (tMin ?? 0)) / 2);
            forecast.push({
              day: labelDay(daily.time[i] as string, i),
              temp: avg,
              condition: m.condition,
              icon: m.icon,
            });
          }
        }

        const weatherData: WeatherData = {
          current: {
            temp: Math.round(cw?.temperature ?? 0),
            condition: map.condition,
            humidity,
            windSpeed: Math.round(cw?.windspeed ?? 0),
            icon: map.icon,
          },
          forecast,
          location: `${geo.name}, ${geo.country}`,
        };

        setWeather(weatherData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, country]);

  return { weather, loading, error };
};