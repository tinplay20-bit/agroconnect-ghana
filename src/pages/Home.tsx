import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sprout, TrendingUp, CloudRain, ShoppingCart, BookOpen, Phone } from "lucide-react";

const Home = () => {
  const quickLinks = [
    {
      title: "Market Prices",
      description: "Check current market prices for your crops",
      icon: TrendingUp,
      path: "/market-prices",
      color: "text-green-600"
    },
    {
      title: "Weather Updates",
      description: "Get real-time weather forecasts for farming",
      icon: CloudRain,
      path: "/dashboard",
      color: "text-blue-600"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products",
      icon: ShoppingCart,
      path: "/marketplace",
      color: "text-orange-600"
    },
    {
      title: "Farming Tips",
      description: "Learn best practices and techniques",
      icon: BookOpen,
      path: "/farming-tips",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Sprout className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Welcome to AgroConnect Ghana
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connecting farmers, buyers, and agricultural communities across Ghana. 
              Get market prices, weather updates, and farming tips all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">Get Started - Sign Up</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all the tools and information you need to succeed in agriculture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Card key={link.path} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={link.path}>
                  <CardHeader className="text-center">
                    <link.icon className={`h-12 w-12 mx-auto mb-4 ${link.color}`} />
                    <CardTitle className="text-xl">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {link.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose AgroConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Prices</h3>
                <p className="text-muted-foreground">
                  Get up-to-date market prices to make informed selling decisions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudRain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Insights</h3>
                <p className="text-muted-foreground">
                  Plan your farming activities with accurate weather forecasts
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Sales</h3>
                <p className="text-muted-foreground">
                  Connect directly with buyers and eliminate middlemen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of farmers already using AgroConnect to grow their business
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Create Your Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;