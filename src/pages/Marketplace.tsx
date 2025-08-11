import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Plus, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - will be replaced with real data from Supabase
  const products = [
    {
      id: 1,
      name: "Fresh Maize",
      price: "GH₵ 5.50",
      unit: "per kg",
      location: "Kumasi, Ashanti",
      seller: "John Farmer",
      phone: "+233 244 123 456",
      category: "cereals",
      description: "High quality yellow maize, freshly harvested",
      image: "/images/marketplace/maize.jpg",
      inStock: true
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      price: "GH₵ 8.00",
      unit: "per kg",
      location: "Accra, Greater Accra",
      seller: "Mary Vegetables",
      phone: "+233 244 789 123",
      category: "vegetables",
      description: "Organic tomatoes, perfect for cooking",
      image: "/images/marketplace/tomatoes.jpg",
      inStock: true
    },
    {
      id: 3,
      name: "Cassava Tubers",
      price: "GH₵ 3.20",
      unit: "per kg",
      location: "Cape Coast, Central",
      seller: "Samuel Roots",
      phone: "+233 244 456 789",
      category: "tubers",
      description: "Fresh cassava tubers, ideal for processing",
      image: "/images/marketplace/cassava.jpg",
      inStock: false
    },
    {
      id: 4,
      name: "Free Range Chicken",
      price: "GH₵ 45.00",
      unit: "each",
      location: "Tamale, Northern",
      seller: "Ibrahim Poultry",
      phone: "+233 244 321 654",
      category: "livestock",
      description: "Healthy free-range chickens",
      image: "/images/marketplace/chicken.jpg",
      inStock: true
    },
    {
      id: 5,
      name: "Plantain Bunches",
      price: "GH₵ 12.00",
      unit: "per bunch",
      location: "Takoradi, Western",
      seller: "Grace Fruits",
      phone: "+233 244 987 654",
      category: "fruits",
      description: "Sweet plantain bunches, ready to eat",
      image: "/images/marketplace/plantain.jpg",
      inStock: true
    },
    {
      id: 6,
      name: "Premium Jasmine Rice",
      price: "GH₵ 8.50",
      unit: "per kg",
      location: "Bolgatanga, Upper East",
      seller: "Abdul's Quality Grains",
      phone: "+233 244 555 123",
      category: "cereals",
      description: "High-quality jasmine rice, locally grown and carefully processed",
      image: "/images/marketplace/rice.jpg",
      inStock: true
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cereals", label: "Cereals" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "tubers", label: "Tubers" },
    { value: "livestock", label: "Livestock" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
              <p className="text-muted-foreground">
                Buy and sell agricultural products across Ghana
              </p>
            </div>
            <Button asChild>
              <Link to="/add-product">
                <Plus className="h-4 w-4 mr-2" />
                List Your Product
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.location}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Sold Out"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">Seller: {product.seller}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" disabled={!product.inStock}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex-1"
                        disabled={!product.inStock}
                        onClick={() => navigate("/checkout", { 
                          state: { 
                            product: {
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              unit: product.unit,
                              seller: product.seller
                            }
                          } 
                        })}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No products found matching your search criteria.
            </p>
            <Button asChild>
              <Link to="/add-product">
                <Plus className="h-4 w-4 mr-2" />
                Be the first to list this product
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;