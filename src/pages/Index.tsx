
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/WaitlistForm';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

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
            <p className="section-subtitle">
              Be the first to know when Steer launches in your area and gain early access to our platform.
            </p>
            
            <div className="max-w-md mx-auto mt-10">
              <WaitlistForm buttonText="Join the Waitlist" />
            </div>
            
            <div className="mt-8 text-gray-600">
              We're currently building our network of farms and customers. <br />
              Sign up now to stay updated!
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
