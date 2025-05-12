
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Connecting directly with farmers has completely changed how I buy beef. The quality is incomparable and I love supporting local agriculture.",
    author: "Sarah Johnson",
    title: "Home Chef"
  },
  {
    quote: "As a farmer, Steer has helped me reach customers directly and earn more for my products while building meaningful relationships.",
    author: "Mike Peterson",
    title: "Cattle Farmer"
  },
  {
    quote: "The transparency and quality assurance from farm to table gives me confidence in what I'm serving my family.",
    author: "David Chen",
    title: "Busy Parent"
  }
];

const TestimonialSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title">What People Are Saying</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="text-4xl font-serif text-steer-tan mb-4">"</div>
                <p className="text-gray-700 italic flex-grow">
                  {testimonial.quote}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-steer-brown">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
