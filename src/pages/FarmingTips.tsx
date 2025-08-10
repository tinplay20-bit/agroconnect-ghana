import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, BookOpen, Droplets, Bug, Sprout, Sun } from "lucide-react";

const FarmingTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - will be replaced with real data from Supabase
  const farmingTips = [
    {
      id: 1,
      title: "Effective Pest Control for Maize Crops",
      excerpt: "Learn natural and chemical methods to protect your maize from common pests like fall armyworm.",
      category: "Pest Control",
      author: "Dr. Samuel Agri",
      date: "2024-01-08",
      readTime: "5 min read",
      image: "/placeholder.svg",
      content: "Detailed guide on identifying and controlling pests in maize cultivation...",
      tags: ["maize", "pest-control", "fall-armyworm"],
      icon: Bug
    },
    {
      id: 2,
      title: "Water-Efficient Irrigation Techniques",
      excerpt: "Maximize your crop yield while conserving water with these proven irrigation methods.",
      category: "Irrigation",
      author: "Mary Water Expert",
      date: "2024-01-07",
      readTime: "7 min read",
      image: "/placeholder.svg",
      content: "Comprehensive guide to drip irrigation and water management...",
      tags: ["irrigation", "water-conservation", "efficiency"],
      icon: Droplets
    },
    {
      id: 3,
      title: "Soil Preparation for Rainy Season Planting",
      excerpt: "Get your soil ready for the upcoming rainy season with proper preparation techniques.",
      category: "Soil Management",
      author: "John Soil Scientist",
      date: "2024-01-06",
      readTime: "6 min read",
      image: "/placeholder.svg",
      content: "Step-by-step guide to soil preparation and nutrient management...",
      tags: ["soil", "rainy-season", "preparation"],
      icon: Sprout
    },
    {
      id: 4,
      title: "Maximizing Tomato Yields in Dry Season",
      excerpt: "Special techniques to grow healthy tomatoes during Ghana's dry season.",
      category: "Crop Management",
      author: "Grace Horticulturist",
      date: "2024-01-05",
      readTime: "8 min read",
      image: "/placeholder.svg",
      content: "Complete guide to dry season tomato cultivation...",
      tags: ["tomatoes", "dry-season", "yields"],
      icon: Sun
    },
    {
      id: 5,
      title: "Organic Fertilizer Production at Home",
      excerpt: "Create nutrient-rich organic fertilizers using locally available materials.",
      category: "Fertilizers",
      author: "Abdul Organic Farmer",
      date: "2024-01-04",
      readTime: "10 min read",
      image: "/placeholder.svg",
      content: "DIY guide to making organic fertilizers from kitchen waste and farm residues...",
      tags: ["organic", "fertilizer", "diy"],
      icon: Sprout
    },
    {
      id: 6,
      title: "Post-Harvest Storage Techniques",
      excerpt: "Reduce post-harvest losses with proper storage methods for various crops.",
      category: "Post-Harvest",
      author: "Ibrahim Storage Expert",
      date: "2024-01-03",
      readTime: "9 min read",
      image: "/placeholder.svg",
      content: "Learn proper storage techniques to minimize crop losses...",
      tags: ["storage", "post-harvest", "preservation"],
      icon: BookOpen
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Pest Control", label: "Pest Control" },
    { value: "Irrigation", label: "Irrigation" },
    { value: "Soil Management", label: "Soil Management" },
    { value: "Crop Management", label: "Crop Management" },
    { value: "Fertilizers", label: "Fertilizers" },
    { value: "Post-Harvest", label: "Post-Harvest" }
  ];

  const filteredTips = farmingTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farming Tips & Guides</h1>
          <p className="text-muted-foreground mb-6">
            Expert advice and practical tips to improve your farming practices
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tips and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <tip.icon className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{tip.category}</Badge>
                    <span className="text-sm text-muted-foreground">{tip.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {tip.excerpt}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {tip.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {tip.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(tip.date).toLocaleDateString()}
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              No farming tips found matching your search criteria.
            </p>
            <Button variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  Seasonal Farming Calendar
                </CardTitle>
                <CardDescription>
                  Plan your farming activities throughout the year with our comprehensive calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Download Calendar
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                  Farmer's Handbook
                </CardTitle>
                <CardDescription>
                  Complete guide to modern farming techniques in Ghana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="secondary">
                  Get Handbook
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingTips;