import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
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
        <FAQSection />
      </main>
      
      <Footer />
      <ExampleShopModal open={shopModalOpen} onOpenChange={setShopModalOpen} />
    </div>
  );
};

export default Index;
