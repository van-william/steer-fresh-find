
import { Button } from "@/components/ui/button";
import WaitlistForm from "./WaitlistForm";
import { Beef, Tractor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-steer-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="font-serif text-2xl font-bold mb-4">Steer</div>
            <p className="text-steer-cream/80 max-w-xs">
              Connecting consumers directly with cattle farmers for premium, ethically-raised beef.
            </p>
            <div className="mt-6 flex gap-4">
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">
                <Beef className="mr-2 h-4 w-4" />
                For Customers
              </Button>
              <Button variant="outline" size="sm" className="border-steer-green hover:bg-steer-green/20 text-steer-green">
                <Tractor className="mr-2 h-4 w-4" />
                For Farmers
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-steer-cream/80 hover:text-white">About</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">For Farmers</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-steer-cream/80 hover:text-white">Facebook</a></li>
              <li><a href="mailto:contact@steer.app" className="text-steer-cream/80 hover:text-white">contact@steer.app</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 text-sm text-steer-cream/60 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} Steer. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            Currently accepting waitlist signups. Launching soon.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
