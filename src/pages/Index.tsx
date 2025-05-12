
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/WaitlistForm';
import ExampleShopModal from '@/components/ExampleShopModal';
import { Beef } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="font-serif text-2xl font-bold text-steer-brown">Steer</div>
            <div className="flex items-center gap-2 md:gap-4">
              <Button 
                variant="outline"
                className="border-steer-green text-steer-green hover:bg-steer-green hover:text-white"
                onClick={() => setShopModalOpen(true)}
              >
                <Beef className="mr-2 h-4 w-4" />
                See Example Shop
              </Button>
              <Button 
                variant="ghost" 
                className="hover:bg-steer-brown hover:text-white"
                onClick={() => {
                  const joinSection = document.getElementById('join-waitlist');
                  joinSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialSection />
        <FAQSection />
        
        {/* Final CTA Section */}
        <section id="join-waitlist" className="bg-white py-16 md:py-24">
          <div className="section-container text-center">
            <h2 className="section-title">Join Our Waitlist</h2>
            <p className="section-subtitle mb-6">
              Be the first to know when Steer launches in your area and gain early access to our platform.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center mt-10">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex-1 max-w-md border-t-4 border-steer-brown">
                <h3 className="text-xl font-bold text-steer-brown mb-4">For Meat Lovers</h3>
                <p className="text-gray-600 mb-6">Get access to premium, farm-fresh beef delivered directly to your door.</p>
                <WaitlistForm buttonText="Join as Customer" />
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex-1 max-w-md border-t-4 border-steer-green">
                <h3 className="text-xl font-bold text-steer-green mb-4">For Farmers</h3>
                <p className="text-gray-600 mb-6">List your farm and sell your premium beef directly to consumers.</p>
                <WaitlistForm buttonText="Join as Farmer" />
              </div>
            </div>
            
            <div className="mt-8 text-gray-600">
              We're currently building our network of farms and customers. <br />
              Sign up now to stay updated!
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ExampleShopModal open={shopModalOpen} onOpenChange={setShopModalOpen} />
    </div>
  );
};

export default Index;
