
import { Beef, Users, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Premium Quality",
    description: "Ethically raised, grass-fed beef from local farms with complete transparency in farming practices.",
    icon: <Beef className="h-10 w-10 text-steer-red" />
  },
  {
    title: "Direct Relationships",
    description: "Connect directly with farmers, cutting out middlemen and supporting local agriculture.",
    icon: <Users className="h-10 w-10 text-steer-green" />
  },
  {
    title: "Farm to Table",
    description: "Fresh cuts delivered straight to your door, with complete traceability from farm to table.",
    icon: <Truck className="h-10 w-10 text-steer-brown" />
  }
];

const BenefitsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Why Choose Steer?</h2>
        <p className="section-subtitle">
          We're revolutionizing how you access fresh, local beef by connecting you directly with farmers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border border-steer-tan/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-steer-cream p-3 rounded-full mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-steer-brown mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
