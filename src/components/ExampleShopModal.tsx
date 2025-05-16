
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Beef, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ExampleShopModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const products = [
  {
    id: 1,
    name: "Premium Ribeye Steak",
    price: 24.99,
    weight: "12oz",
    image: "https://images.unsplash.com/photo-1603048297172-c92544817d14?auto=format&fit=crop&q=80",
    farm: "Green Pastures Farm",
    description: "Beautifully marbled grass-fed ribeye, perfect for grilling",
  },
  {
    id: 2,
    name: "Ground Beef Bundle",
    price: 39.99,
    weight: "5lb",
    image: "https://images.unsplash.com/photo-1551135570-7631a61d31aa?auto=format&fit=crop&q=80",
    farm: "Rocky Mountain Ranch",
    description: "Lean ground beef, perfect for burgers and everyday cooking",
  },
  {
    id: 3,
    name: "Filet Mignon",
    price: 29.99,
    weight: "8oz",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
    farm: "Heritage Cattle Co.",
    description: "Tender, melt-in-your-mouth filet from pasture-raised cattle",
  },
  {
    id: 4,
    name: "Beef Brisket",
    price: 49.99,
    weight: "4lb",
    image: "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80",
    farm: "Sunrise Farms",
    description: "Slow-cook to perfection for an unforgettable BBQ experience",
  }
];

const ExampleShopModal = ({ open, onOpenChange }: ExampleShopModalProps) => {
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Beef className="h-6 w-6 text-steer-red" />
            Example Shop Experience
          </DialogTitle>
          <DialogDescription>
            This is what customers will see when browsing beef products on Steer
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-lg bg-steer-cream/30 p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-steer-brown">Browse Local Farm Products</h3>
              <p className="text-gray-600">Fresh cuts from farms within 50 miles of your location</p>
            </div>
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cart.length})
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-steer-brown">
                    {product.farm}
                  </div>
                </div>
                <div className="p-4 grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <div className="font-bold text-steer-brown">${product.price}</div>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">{product.weight}</div>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
                <div className="p-4 pt-0">
                  <Button 
                    className="w-full bg-steer-brown hover:bg-steer-brown/90"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 italic">This is just an example interface. Join our waitlist to get access when we launch!</p>
            <Button 
              className="mt-4 bg-steer-green hover:bg-steer-green/90"
              onClick={() => onOpenChange(false)}
            >
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExampleShopModal;
