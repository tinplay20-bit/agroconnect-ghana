
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Plus, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string;
  location: string;
  contact_info: string | null;
  image_url: string | null;
  user_id: string;
  created_at: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Fruits", label: "Fruits" },
    { value: "Vegetables", label: "Vegetables" },
    { value: "Grains", label: "Grains" },
    { value: "Livestock", label: "Livestock" },
    { value: "Dairy", label: "Dairy" },
    { value: "Seeds", label: "Seeds" },
    { value: "Tools", label: "Tools" },
    { value: "Other", label: "Other" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Ghana Agro Marketplace</h1>
              <p className="text-muted-foreground">
                Buy and sell quality agricultural products across Ghana
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
                    src={product.image_url || "/placeholder.svg"} 
                    alt={`${product.name} - ${product.location}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="default">Available</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      GH₵ {product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                  
                  <div className="pt-2 border-t">
                    {product.contact_info && (
                      <p className="text-sm mb-2">Contact: {product.contact_info}</p>
                    )}
                    <div className="flex gap-2">
                      {product.contact_info && (
                        <Button size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Seller
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex-1"
                        onClick={() => navigate("/checkout", { 
                          state: { 
                            product: {
                              id: product.id,
                              name: product.name,
                              price: `GH₵ ${product.price.toFixed(2)}`,
                              seller: "Seller"
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

        {filteredProducts.length === 0 && !loading && (
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
