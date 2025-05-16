import { createClient } from "@/lib/supabase/server";
import { hasCompletedOnboarding } from "@/lib/onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type LoaderFunctionArgs, redirect, useLoaderData, Link } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient(request);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/login");
  }

  // Check if user has completed onboarding
  const onboardingCompleted = await hasCompletedOnboarding(supabase, data.user.id);

  // If onboarding not completed, redirect to onboarding
  if (!onboardingCompleted) {
    return redirect("/onboarding");
  }

  // Get profile data
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  // Get user preferences
  const { data: preferencesData } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", data.user.id)
    .single();
    
  // Get products data
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  return {
    user: data.user,
    profile: profileData,
    preferences: preferencesData,
    products: productsData || []
  };
};

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  // Get list of preferred cuts
  const preferredCuts = [];
  if (data.preferences?.ribeye_preferred)
    preferredCuts.push("Premium Ribeye Steak");
  if (data.preferences?.ground_beef_preferred)
    preferredCuts.push("Ground Beef Bundle");
  if (data.preferences?.filet_mignon_preferred)
    preferredCuts.push("Filet Mignon");
  if (data.preferences?.brisket_preferred) preferredCuts.push("Beef Brisket");
    
  // Mock data for orders
  const upcomingDeliveries = [
    {
      id: "order-123",
      date: "June 15, 2024", 
      status: "Processing",
      items: 3
    }
  ];
  
  // Fallback products if database doesn't have them
  const products = data.products?.length > 0 ? data.products : [
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
    },
  ];

  return (
    <div className="min-h-svh">
      {/* Header with navigation */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">Steer Fresh</h1>
            <nav className="hidden md:flex space-x-4">
              <Link to="/home" className="font-medium">Home</Link>
              <Link to="/shop" className="text-muted-foreground">Shop</Link>
              <Link to="/subscription" className="text-muted-foreground">Subscription</Link>
              <Link to="/farms" className="text-muted-foreground">Our Farms</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline-block">Hello, {data.user.email?.split('@')[0]}</span>
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <Link to="/logout">
              <Button variant="outline" size="sm">Logout</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Welcome section */}
        <section className="mb-12">
          <div className="rounded-lg bg-muted p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Your Fresh Meats Dashboard</h1>
            <p className="text-lg mb-6">
              Your farm-to-table journey starts here. Browse our premium cuts, manage your
              subscription, and track your deliveries all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Shop Now</Button>
              <Button variant="outline" size="lg">Manage Subscription</Button>
            </div>
          </div>
        </section>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming deliveries */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deliveries</CardTitle>
                <CardDescription>
                  Track your fresh meat deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingDeliveries.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingDeliveries.map(delivery => (
                      <div key={delivery.id} className="flex flex-col sm:flex-row justify-between bg-muted p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium">Delivery on {delivery.date}</h3>
                          <p className="text-sm text-muted-foreground">{delivery.items} items • {delivery.status}</p>
                        </div>
                        <Button size="sm" className="mt-2 sm:mt-0">Track Order</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">No upcoming deliveries</p>
                    <Button>Schedule a Delivery</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended for you */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  Based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.slice(0, 2).map(product => (
                    <div key={product.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.farm}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${product.price}</p>
                            <p className="text-xs text-muted-foreground">{product.weight}</p>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">Add to Cart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Your preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>Customize your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Preferred Cuts</h3>
                  <ul className="text-sm space-y-1">
                    {preferredCuts.length > 0 ? (
                      preferredCuts.map((cut) => (
                        <li key={cut} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 text-green-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {cut}
                        </li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">No preferences set</li>
                    )}
                  </ul>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Weekly Quantity</h3>
                    <p className="text-sm">{data.preferences?.weekly_quantity || "Not set"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Monthly Budget</h3>
                    <p className="text-sm">${data.preferences?.monthly_budget || "Not set"}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Edit Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.profile ? (
                  <div>
                    <p className="text-sm">{data.profile.address_line1}</p>
                    {data.profile.address_line2 && (
                      <p className="text-sm">{data.profile.address_line2}</p>
                    )}
                    <p className="text-sm">
                      {data.profile.city}, {data.profile.state} {data.profile.postal_code}
                    </p>
                    
                    {data.profile.delivery_instructions && (
                      <div className="mt-2">
                        <h3 className="text-sm font-medium">Delivery Instructions:</h3>
                        <p className="text-xs text-muted-foreground">{data.profile.delivery_instructions}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No address on file</p>
                )}

                <Button variant="outline" size="sm" className="w-full">
                  Edit Address
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}