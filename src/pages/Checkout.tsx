import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";

interface ProductData {
  id: number;
  name: string;
  price: string;
  unit: string;
  seller: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Product data from marketplace
  const productData = location.state?.product as ProductData;
  
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    phone: "",
    deliveryAddress: "",
    deliveryMethod: "",
    notes: ""
  });

  // Calculate price and total
  const numericPrice = productData ? parseFloat(productData.price.replace(/[^\d.]/g, '')) : 0;
  const totalPrice = numericPrice * quantity;

  useEffect(() => {
    if (!productData) {
      toast({
        title: "Error",
        description: "No product selected. Please go back to marketplace.",
        variant: "destructive",
      });
      navigate("/marketplace");
    }
  }, [productData, navigate, toast]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!orderForm.fullName || !orderForm.phone || !orderForm.deliveryAddress || !orderForm.deliveryMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_name: productData.name,
          price: numericPrice,
          quantity: quantity,
          total_price: totalPrice,
          full_name: orderForm.fullName,
          phone: orderForm.phone,
          delivery_address: orderForm.deliveryAddress,
          delivery_method: orderForm.deliveryMethod,
          notes: orderForm.notes || null,
        });

      if (error) throw error;

      toast({
        title: "Order placed successfully!",
        description: "Your order has been submitted and is being processed.",
      });

      // Reset form and redirect
      setOrderForm({
        fullName: "",
        phone: "",
        deliveryAddress: "",
        deliveryMethod: "",
        notes: ""
      });
      setQuantity(1);
      navigate("/dashboard");

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!productData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/marketplace")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>

        {/* Product Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{productData.name}</h3>
                  <p className="text-sm text-muted-foreground">Sold by: {productData.seller}</p>
                  <p className="text-lg font-bold text-primary mt-2">
                    {productData.price} per {productData.unit}
                  </p>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 py-4 border-t">
                <Label className="font-medium">Quantity:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 border rounded-md min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span className="text-primary">GH₵ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Information Form */}
        <Card>
          <CardHeader>
            <CardTitle>Buyer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={orderForm.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    placeholder="+233 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                <Textarea
                  id="deliveryAddress"
                  value={orderForm.deliveryAddress}
                  onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                  required
                  placeholder="Enter your complete delivery address"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="deliveryMethod">Delivery Method *</Label>
                <Select 
                  value={orderForm.deliveryMethod} 
                  onValueChange={(value) => handleInputChange("deliveryMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup from Seller</SelectItem>
                    <SelectItem value="delivery">Home Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={orderForm.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any special instructions or requests..."
                  rows={2}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Placing Order..." : `Place Order - GH₵ ${totalPrice.toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Note */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a direct order to the seller. You will be contacted 
              shortly to confirm payment method and delivery details. No payment is processed 
              through this platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;