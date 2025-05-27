import { Button } from "@/components/ui/button";
import WaitlistForm from "./WaitlistForm";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-steer-cream to-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-steer-brown/5"></div>
      </div>
      
      <div className="relative z-10 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-steer-brown mb-6">
              Farm Fresh Beef,<br /> 
              <span className="text-steer-red">Direct from the farmer</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              Steer connects you directly with local cattle farmers for premium, pasture-raised beef. Skip the middleman, support local farms, and enjoy the freshest cuts.
            </p>
            
            <div className="max-w-md mx-auto lg:mx-0">
              <WaitlistForm type="both" />
            </div>
            
            <div className="mt-6 text-sm text-gray-500 flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
              <div>Be the first to know when Steer launches in your area</div>
              <div className="text-steer-green font-medium">Farmers: List your products!</div>
            </div>
          </div>
          
          <div className="hidden lg:block relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-2xl shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
