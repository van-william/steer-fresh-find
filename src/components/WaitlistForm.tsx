
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  variant?: "default" | "inline";
  type?: "customer" | "farmer" | "both";
}

const WaitlistForm = ({
  className = "",
  buttonText = "Join Waitlist",
  variant = "default",
  type = "both"
}: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userType, setUserType] = useState<"customer" | "farmer">("customer");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // This is where you would integrate with a backend service
    // For now, we'll simulate success
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log the data (in a real app, you'd send this to your backend)
      console.log("Waitlist signup:", { name, email, userType });
      
      // Show success state
      setIsSuccess(true);
      setEmail("");
      setName("");
      
      toast({
        title: "Success!",
        description: `You've been added to our waitlist as a ${userType}.`,
      });
      
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          disabled={isLoading || isSuccess}
        />
        <Button 
          type="submit" 
          disabled={isLoading || isSuccess}
          className="bg-steer-brown hover:bg-steer-brown/90 text-white"
        >
          {isSuccess ? <Check className="mr-2 h-4 w-4" /> : null}
          {isSuccess ? "Joined" : buttonText}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div>
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          disabled={isLoading || isSuccess}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={isLoading || isSuccess}
          required
        />
      </div>
      
      {type === "both" && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant={userType === "customer" ? "default" : "outline"}
            className={`flex-1 ${userType === "customer" ? "bg-steer-brown hover:bg-steer-brown/90 text-white" : ""}`}
            onClick={() => setUserType("customer")}
            disabled={isLoading || isSuccess}
          >
            Join as Customer
          </Button>
          <Button
            type="button"
            variant={userType === "farmer" ? "default" : "outline"} 
            className={`flex-1 ${userType === "farmer" ? "bg-steer-green hover:bg-steer-green/90 text-white" : ""}`}
            onClick={() => setUserType("farmer")}
            disabled={isLoading || isSuccess}
          >
            Join as Farmer
          </Button>
        </div>
      )}
      
      <Button 
        type="submit" 
        className={`w-full ${userType === "farmer" ? "bg-steer-green hover:bg-steer-green/90" : "bg-steer-brown hover:bg-steer-brown/90"} text-white`}
        disabled={isLoading || isSuccess}
      >
        {isLoading ? "Processing..." : isSuccess ? "Added to Waitlist! ✓" : buttonText}
      </Button>
    </form>
  );
};

export default WaitlistForm;
