import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, CloudSnow, Zap } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";

const WeatherWidget = () => {
  const { weather, loading, error } = useWeather();

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return Sun;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return Cloud;
    if (iconCode.includes('09') || iconCode.includes('10')) return CloudRain;
    if (iconCode.includes('11')) return Zap;
    if (iconCode.includes('13')) return CloudSnow;
    return Cloud;
  };

  if (loading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load weather data</p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          Weather Forecast
        </CardTitle>
        <CardDescription>
          Plan your farming activities with real-time weather data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">Current Weather</h3>
              <p className="text-muted-foreground">{weather.location}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary mb-1">
                {weather.current.temp}°C
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {weather.current.condition}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
            <div className="text-sm">
              <span className="text-muted-foreground">Humidity: </span>
              <span className="font-medium">{weather.current.humidity}%</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Wind: </span>
              <span className="font-medium">{weather.current.windSpeed} m/s</span>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div>
          <h4 className="text-lg font-semibold mb-4">3-Day Forecast</h4>
          <div className="grid grid-cols-3 gap-4">
            {weather.forecast.map((day, index) => {
              const IconComponent = getWeatherIcon(day.icon);
              return (
                <div key={index} className="text-center p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="text-sm font-medium mb-3 text-muted-foreground">
                    {day.day}
                  </div>
                  <IconComponent className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-xl font-bold mb-1">{day.temp}°C</div>
                  <div className="text-xs text-muted-foreground">{day.condition}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;