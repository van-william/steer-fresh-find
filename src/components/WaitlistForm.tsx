import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { WaitlistEntry } from "@/lib/supabase";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address");
const zipCodeSchema = z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid US ZIP code");
const monthlyVolumeSchema = z.number().min(1, "Please enter a valid number");

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
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    zipCode: "",
    comments: "",
    monthlyCattleSold: "",
    monthlyBeefPounds: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userType, setUserType] = useState<"customer" | "farmer">("customer");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = value.replace(/[<>]/g, '');
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate email
    try {
      emailSchema.parse(formData.email);
    } catch (error) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate ZIP code
    try {
      zipCodeSchema.parse(formData.zipCode);
    } catch (error) {
      newErrors.zipCode = "Please enter a valid US ZIP code";
    }

    // Validate monthly volume based on role
    if (userType === "farmer") {
      const cattle = parseInt(formData.monthlyCattleSold);
      if (isNaN(cattle) || cattle < 1) {
        newErrors.monthlyCattleSold = "Please enter the number of cattle you plan to sell monthly";
      }
    } else {
      const pounds = parseInt(formData.monthlyBeefPounds);
      if (isNaN(pounds) || pounds < 1) {
        newErrors.monthlyBeefPounds = "Please enter the pounds of beef you consume monthly";
      }
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const waitlistEntry: WaitlistEntry = {
        email: formData.email,
        name: formData.name,
        zip_code: formData.zipCode,
        comments: formData.comments,
        role: userType,
        ...(userType === "farmer" 
          ? { monthly_cattle_sold: parseInt(formData.monthlyCattleSold) }
          : { monthly_beef_pounds: parseInt(formData.monthlyBeefPounds) }
        )
      };

      const { error } = await supabase
        .from('waitlist')
        .insert([waitlistEntry]);

      if (error) throw error;
      
      // Show success state
      setIsSuccess(true);
      setFormData({
        email: "",
        name: "",
        zipCode: "",
        comments: "",
        monthlyCattleSold: "",
        monthlyBeefPounds: "",
      });
      
      toast({
        title: "Success!",
        description: `You've been added to our waitlist as a ${userType}.`,
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="grow"
          disabled={isLoading || isSuccess}
          aria-invalid={!!errors.email}
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
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {type === "both" && (
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant={userType === "customer" ? "default" : "outline-solid"}
            className={`flex-1 ${userType === "customer" ? "bg-steer-brown hover:bg-steer-brown/90 text-white" : ""}`}
            onClick={() => setUserType("customer")}
            disabled={isLoading || isSuccess}
          >
            Join as Customer
          </Button>
          <Button
            type="button"
            variant={userType === "farmer" ? "default" : "outline-solid"}
            className={`flex-1 ${userType === "farmer" ? "bg-steer-green hover:bg-steer-green/90 text-white" : ""}`}
            onClick={() => setUserType("farmer")}
            disabled={isLoading || isSuccess}
          >
            Join as Farmer
          </Button>
        </div>
      )}
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full"
          disabled={isLoading || isSuccess}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full"
          disabled={isLoading || isSuccess}
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <Input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="w-full"
          disabled={isLoading || isSuccess}
          aria-invalid={!!errors.zipCode}
        />
        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
      </div>

      {userType === "farmer" ? (
        <div>
          <Input
            type="number"
            name="monthlyCattleSold"
            placeholder="Target cattle sold monthly"
            value={formData.monthlyCattleSold}
            onChange={handleInputChange}
            className="w-full"
            disabled={isLoading || isSuccess}
            min="1"
            aria-invalid={!!errors.monthlyCattleSold}
          />
          {errors.monthlyCattleSold && <p className="text-red-500 text-sm mt-1">{errors.monthlyCattleSold}</p>}
        </div>
      ) : (
        <div>
          <Input
            type="number"
            name="monthlyBeefPounds"
            placeholder="Pounds of beef consumed monthly"
            value={formData.monthlyBeefPounds}
            onChange={handleInputChange}
            className="w-full"
            disabled={isLoading || isSuccess}
            min="1"
            aria-invalid={!!errors.monthlyBeefPounds}
          />
          {errors.monthlyBeefPounds && <p className="text-red-500 text-sm mt-1">{errors.monthlyBeefPounds}</p>}
        </div>
      )}

      <div>
        <Textarea
          name="comments"
          placeholder="Comments or questions (optional)"
          value={formData.comments}
          onChange={handleInputChange}
          className="w-full"
          disabled={isLoading || isSuccess}
          rows={3}
        />
      </div>
      
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
