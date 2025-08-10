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
  const API_KEY = 'f31c2adf3c924e298ee140151251008';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const currentData = await currentResponse.json();

        // Get 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
        );
        
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        
        const forecastData = await forecastResponse.json();

        // Process forecast data (get one per day for next 3 days)
        const dailyForecasts = [];
        const days = ['Today', 'Tomorrow'];
        
        for (let i = 1; i <= 2; i++) {
          const dayData = forecastData.list[i * 8]; // Every 8th item is ~24 hours later
          if (dayData) {
            dailyForecasts.push({
              day: days[i - 1] || new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
              temp: Math.round(dayData.main.temp),
              condition: dayData.weather[0].main,
              icon: dayData.weather[0].icon
            });
          }
        }

        // Add today's forecast
        dailyForecasts.unshift({
          day: 'Today',
          temp: Math.round(currentData.main.temp),
          condition: currentData.weather[0].main,
          icon: currentData.weather[0].icon
        });

        const weatherData: WeatherData = {
          current: {
            temp: Math.round(currentData.main.temp),
            condition: currentData.weather[0].main,
            humidity: currentData.main.humidity,
            windSpeed: currentData.wind?.speed || 0,
            icon: currentData.weather[0].icon
          },
          forecast: dailyForecasts.slice(0, 3),
          location: `${currentData.name}, ${currentData.sys.country}`
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