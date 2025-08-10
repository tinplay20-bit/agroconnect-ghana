import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudRain, Sun, Cloud, TrendingUp, Plus, Eye, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - will be replaced with real data from Supabase
  const userData = {
    name: "John Farmer",
    location: "Kumasi, Ghana"
  };

  const weatherData = {
    current: { temp: 28, condition: "Sunny", humidity: 65 },
    forecast: [
      { day: "Today", temp: 28, condition: "Sunny", icon: Sun },
      { day: "Tomorrow", temp: 26, condition: "Cloudy", icon: Cloud },
      { day: "Wednesday", temp: 24, condition: "Rainy", icon: CloudRain }
    ]
  };

  const userProducts = [
    { id: 1, name: "Maize", price: "GH₵ 5.50/kg", status: "Active", views: 23 },
    { id: 2, name: "Tomatoes", price: "GH₵ 8.00/kg", status: "Active", views: 15 },
    { id: 3, name: "Cassava", price: "GH₵ 3.20/kg", status: "Sold", views: 8 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in {userData.location} today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Widget */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5" />
                Weather Forecast
              </CardTitle>
              <CardDescription>
                Plan your farming activities with accurate weather data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Current Weather */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Current Weather</h3>
                    <p className="text-muted-foreground">{userData.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{weatherData.current.temp}°C</div>
                    <div className="text-sm text-muted-foreground">
                      {weatherData.current.condition}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Humidity: {weatherData.current.humidity}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast */}
              <div className="grid grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium mb-2">{day.day}</div>
                    <day.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-semibold">{day.temp}°C</div>
                    <div className="text-xs text-muted-foreground">{day.condition}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your farming business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/marketplace">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/market-prices">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Check Market Prices
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/farming-tips">
                  <Eye className="h-4 w-4 mr-2" />
                  Browse Farming Tips
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Products */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Products</CardTitle>
                <CardDescription>
                  Manage your listed products and track performance
                </CardDescription>
              </div>
              <Button asChild>
                <Link to="/marketplace">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{product.views} views</div>
                      <div className={`text-sm ${product.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                        {product.status}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;