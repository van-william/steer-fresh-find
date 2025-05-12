
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Steer work?",
    answer: "Steer is a platform that connects consumers directly with local cattle farmers. You can browse farms, select the cuts or packages you want, and have them delivered directly to your door. Currently, we're building our network and accepting waitlist signups."
  },
  {
    question: "Where is Steer available?",
    answer: "We're currently planning our initial launch in select regions. Join our waitlist to be notified when we launch in your area."
  },
  {
    question: "How is the beef processed and packaged?",
    answer: "All beef is processed at USDA-inspected facilities and professionally packaged for freshness. Each package is labeled with farm origin, cut information, and processing date for complete transparency."
  },
  {
    question: "Do you offer bulk purchases?",
    answer: "Yes, you'll be able to purchase quarter, half, or whole animals directly from farmers, often at a significant discount compared to individual cuts."
  },
  {
    question: "How do you ensure quality?",
    answer: "We carefully vet all partner farms for their raising practices, animal welfare standards, and quality of product. We also collect and share customer reviews for each farm."
  }
];

const FAQSection = () => {
  return (
    <section className="bg-steer-cream/20 py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 hover:text-steer-brown font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-8 text-gray-600">
          Have other questions? <a href="#" className="text-steer-brown hover:underline">Contact us</a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
