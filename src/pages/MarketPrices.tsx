import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus, Search, RefreshCw } from "lucide-react";

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data - will be replaced with real data from Supabase
  const marketPrices = [
    {
      id: 1,
      product: "Maize",
      currentPrice: 5.50,
      previousPrice: 5.20,
      unit: "kg",
      market: "Kumasi Central Market",
      region: "Ashanti",
      trend: "up",
      changePercent: 5.8
    },
    {
      id: 2,
      product: "Rice (Local)",
      currentPrice: 7.80,
      previousPrice: 8.00,
      unit: "kg",
      market: "Accra Central Market",
      region: "Greater Accra",
      trend: "down",
      changePercent: -2.5
    },
    {
      id: 3,
      product: "Tomatoes",
      currentPrice: 8.00,
      previousPrice: 8.00,
      unit: "kg",
      market: "Takoradi Market",
      region: "Western",
      trend: "stable",
      changePercent: 0
    },
    {
      id: 4,
      product: "Plantain",
      currentPrice: 12.00,
      previousPrice: 10.50,
      unit: "bunch",
      market: "Cape Coast Market",
      region: "Central",
      trend: "up",
      changePercent: 14.3
    },
    {
      id: 5,
      product: "Cassava",
      currentPrice: 3.20,
      previousPrice: 3.50,
      unit: "kg",
      market: "Tamale Central Market",
      region: "Northern",
      trend: "down",
      changePercent: -8.6
    },
    {
      id: 6,
      product: "Yam",
      currentPrice: 6.50,
      previousPrice: 6.20,
      unit: "kg",
      market: "Bolgatanga Market",
      region: "Upper East",
      trend: "up",
      changePercent: 4.8
    },
    {
      id: 7,
      product: "Groundnuts",
      currentPrice: 15.00,
      previousPrice: 15.00,
      unit: "kg",
      market: "Wa Market",
      region: "Upper West",
      trend: "stable",
      changePercent: 0
    },
    {
      id: 8,
      product: "Cocoa Beans",
      currentPrice: 25.00,
      previousPrice: 23.50,
      unit: "kg",
      market: "Sunyani Market",
      region: "Bono",
      trend: "up",
      changePercent: 6.4
    }
  ];

  const filteredPrices = marketPrices.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In real app, this would fetch fresh data from API
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Market Prices</h1>
              <p className="text-muted-foreground">
                Real-time market prices across Ghana's major markets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, markets, or regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Rising Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {marketPrices.filter(p => p.trend === "up").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Products with price increases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                Falling Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {marketPrices.filter(p => p.trend === "down").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Products with price decreases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Minus className="h-5 w-5 text-gray-600" />
                Stable Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {marketPrices.filter(p => p.trend === "stable").length}
              </div>
              <p className="text-sm text-muted-foreground">
                Products with no price change
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Prices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Current Market Prices</CardTitle>
            <CardDescription>
              Latest prices from major markets across Ghana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Previous Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Region</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            GH₵ {item.currentPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            per {item.unit}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        GH₵ {item.previousPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <span className={getTrendColor(item.trend)}>
                            {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{item.market}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.region}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPrices.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No products found matching your search criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Prices are updated daily from various markets across Ghana. 
              Actual prices may vary depending on quality, season, and specific market conditions. 
              Use this data as a reference for your trading decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;