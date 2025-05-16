import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Beef, Users, Truck, ShoppingCart, Tractor } from "lucide-react";

const faqs = [
  {
    question: "How does Steer work?",
    answer:
      "Steer is a platform that connects consumers directly with local cattle farmers. You can browse farms, select the cuts or packages you want, and have them delivered directly to your door. Currently, we're building our network and accepting waitlist signups.",
  },
  {
    question: "Where is Steer available?",
    answer:
      "We're currently planning our initial launch in select regions. Join our waitlist to be notified when we launch in your area.",
  },
  {
    question: "How is the beef processed and packaged?",
    answer:
      "All beef is processed at USDA-inspected facilities and professionally packaged for freshness. Each package is labeled with farm origin, cut information, and processing date for complete transparency.",
  },
  {
    question: "Do you offer bulk purchases?",
    answer:
      "Yes, you'll be able to purchase quarter, half, or whole animals directly from farmers, often at a significant discount compared to individual cuts.",
  },
  {
    question: "How do you ensure quality?",
    answer:
      "We carefully vet all partner farms for their raising practices, animal welfare standards, and quality of product. We also collect and share customer reviews for each farm.",
  },
];

const benefits = [
  {
    title: "Premium Quality",
    description:
      "Ethically raised, grass-fed beef from local farms with complete transparency in farming practices.",
    icon: <Beef className="h-10 w-10 text-primary" />,
  },
  {
    title: "Direct Relationships",
    description:
      "Connect directly with farmers, cutting out middlemen and supporting local agriculture.",
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    title: "Farm to Table",
    description:
      "Fresh cuts delivered straight to your door, with complete traceability from farm to table.",
    icon: <Truck className="h-10 w-10 text-primary" />,
  },
];

const steps = [
  {
    number: "01",
    title: "Join the Waitlist",
    description: "Sign up to be notified when Steer launches in your area.",
  },
  {
    number: "02",
    title: "Browse Local Farms",
    description:
      "Explore profiles of local cattle farmers and their farming practices.",
  },
  {
    number: "03",
    title: "Select Your Cuts",
    description:
      "Choose from a variety of premium beef cuts or select bulk packages.",
  },
  {
    number: "04",
    title: "Farm Fresh Delivery",
    description: "Receive your order directly from the farm to your doorstep.",
  },
];

const products = [
  {
    id: 1,
    name: "Premium Ribeye Steak",
    price: 24.99,
    weight: "12oz",
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544817d14?auto=format&fit=crop&q=80",
    farm: "Green Pastures Farm",
    description: "Beautifully marbled grass-fed ribeye, perfect for grilling",
  },
  {
    id: 2,
    name: "Ground Beef Bundle",
    price: 39.99,
    weight: "5lb",
    image:
      "https://images.unsplash.com/photo-1551135570-7631a61d31aa?auto=format&fit=crop&q=80",
    farm: "Rocky Mountain Ranch",
    description: "Lean ground beef, perfect for burgers and everyday cooking",
  },
  {
    id: 3,
    name: "Filet Mignon",
    price: 29.99,
    weight: "8oz",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
    farm: "Heritage Cattle Co.",
    description: "Tender, melt-in-your-mouth filet from pasture-raised cattle",
  },
  {
    id: 4,
    name: "Beef Brisket",
    price: 49.99,
    weight: "4lb",
    image:
      "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80",
    farm: "Sunrise Farms",
    description: "Slow-cook to perfection for an unforgettable BBQ experience",
  },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="font-serif text-2xl font-bold text-primary">
              Steer
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setShopModalOpen(true)}
              >
                <Beef className="mr-2 h-4 w-4" />
                See Example Shop
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  const joinSection = document.getElementById("join-waitlist");
                  joinSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-secondary/20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5"></div>
        </div>

        <div className="relative z-10 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
                Farm Fresh Beef,
                <br />
                <span className="text-destructive">Direct to Your Door</span>
              </h1>

              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Steer connects you directly with local cattle farmers for
                premium, pasture-raised beef. Skip the middleman, support local
                farms, and enjoy the freshest cuts.
              </p>

              <div className="max-w-md mx-auto lg:mx-0" id="join-waitlist">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter your email address"
                    className="flex-grow"
                  />
                  <Button className="bg-primary text-primary-foreground">
                    Join Waitlist
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-sm text-muted-foreground flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                <div>Be the first to know when Steer launches in your area</div>
                <div className="text-primary font-medium">
                  Farmers: List your products!
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-2xl shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Why Choose Steer?
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            We're revolutionizing how you access fresh, local beef by connecting
            you directly with farmers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border border-border shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-secondary p-3 rounded-full mb-5">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            How Steer Works
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Our simple process connects you with local farmers for the freshest
            beef possible.
          </p>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-background rounded-xl p-6 border border-border shadow-xs h-full hover:shadow-md transition-shadow duration-300">
                    <div className="text-4xl font-bold text-primary/20 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 w-12 h-0.5 bg-border transform translate-x-6">
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-border rounded-full transform -translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="bg-secondary/20 py-16 md:py-24
"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto mt-12">
            <Accordion
              type="single"
              collapsible
              className="bg-background rounded-lg shadow-sm"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 hover:text-primary font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-8 text-muted-foreground">
            Have other questions?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact us
            </a>
          </div>
          <div className="flex justify-center mt-10">
            <div className="max-w-md w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter your email address"
                  className="flex-grow"
                />
                <Button className="bg-primary text-primary-foreground">
                  Join Waitlist
                </Button>
              </div>
              <div className="text-sm mt-2 text-muted-foreground text-center">
                Be the first to know when we launch in your area
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="font-serif text-2xl font-bold mb-4">Steer</div>
              <p className="text-primary-foreground/80 max-w-xs">
                Connecting consumers directly with cattle farmers for premium,
                ethically-raised beef.
              </p>
              <div className="mt-6 flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary bg-background hover:border-background hover:text-background hover:[&_svg]:text-background"
                  onClick={() => {
                    const joinSection =
                      document.getElementById("join-waitlist");
                    joinSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Beef className="mr-2 h-4 w-4" />
                  For Customers
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary bg-background hover:border-background hover:text-background hover:[&_svg]:text-background"
                  onClick={() => {
                    const joinSection =
                      document.getElementById("join-waitlist");
                    joinSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Tractor className="mr-2 h-4 w-4" />
                  For Farmers
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    For Farmers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@steer.app"
                    className="text-primary-foreground/80 hover:text-background"
                  >
                    contact@steer.app
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-background/10 text-sm text-primary-foreground/60 flex flex-col md:flex-row justify-between items-center">
            <div>© {new Date().getFullYear()} Steer. All rights reserved.</div>
            <div className="mt-4 md:mt-0">
              Currently accepting waitlist signups. Launching soon.
            </div>
          </div>
        </div>
      </footer>

      {/* Shop Modal */}
      <Dialog open={shopModalOpen} onOpenChange={setShopModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Beef className="h-6 w-6 text-destructive" />
              Example Shop Experience
            </DialogTitle>
            <DialogDescription>
              This is what customers will see when browsing beef products on
              Steer
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 rounded-lg bg-secondary/30 p-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-primary">
                  Browse Local Farm Products
                </h3>
                <p className="text-muted-foreground">
                  Fresh cuts from farms within 50 miles of your location
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart ({cart.length})
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-background rounded-lg overflow-hidden shadow-md flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-background px-2 py-1 rounded-full text-xs font-medium text-primary">
                      {product.farm}
                    </div>
                  </div>
                  <div className="p-4 grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <div className="font-bold text-primary">
                        ${product.price}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm mb-2">
                      {product.weight}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground italic">
                This is just an example interface. Join our waitlist to get
                access when we launch!
              </p>
              <Button
                className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => setShopModalOpen(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
