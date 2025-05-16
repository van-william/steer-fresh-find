
const steps = [
  {
    number: "01",
    title: "Join the Waitlist",
    description: "Sign up to be notified when Steer launches in your area."
  },
  {
    number: "02",
    title: "Browse Local Farms",
    description: "Explore profiles of local cattle farmers and their farming practices."
  },
  {
    number: "03",
    title: "Select Your Cuts",
    description: "Choose from a variety of premium beef cuts or select bulk packages."
  },
  {
    number: "04",
    title: "Farm Fresh Delivery",
    description: "Receive your order directly from the farm to your doorstep."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-steer-cream/30 py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">How Steer Works</h2>
        <p className="section-subtitle">
          Our simple process connects you with local farmers for the freshest beef possible.
        </p>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 border border-steer-tan/20 shadow-xs h-full hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl font-bold text-steer-brown/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-steer-brown mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-12 h-0.5 bg-steer-tan/50 transform translate-x-6">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-steer-tan rounded-full transform -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
