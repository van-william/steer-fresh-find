import { createClient } from "@/lib/supabase/server";
import { hasCompletedOnboarding } from "@/lib/onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient(request);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/login");
  }

  // Check if user has already completed onboarding
  const onboardingCompleted = await hasCompletedOnboarding(
    supabase,
    data.user.id
  );

  if (onboardingCompleted) {
    return redirect("/home");
  }

  return { user: data.user };
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return { error: "User not authenticated" };
  }

  const userId = userData.user.id;

  // Parse form data
  const addressLine1 = formData.get("addressLine1") as string;
  const addressLine2 = formData.get("addressLine2") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const postalCode = formData.get("postalCode") as string;
  const deliveryInstructions = formData.get("deliveryInstructions") as string;

  // Parse selected cuts
  const ribeye = formData.has("ribeye") ? true : false;
  const groundBeef = formData.has("groundBeef") ? true : false;
  const filetMignon = formData.has("filetMignon") ? true : false;
  const brisket = formData.has("brisket") ? true : false;

  // Parse quantities and frequency
  const quantity = parseInt(formData.get("quantity") as string) || 1;
  const frequency = formData.get("frequency") as string;
  const monthlyBudget =
    parseFloat(formData.get("monthlyBudget") as string) || 0;

  try {
    // Insert or update profile data
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city,
      state,
      postal_code: postalCode,
      delivery_instructions: deliveryInstructions,
      onboarding_completed: true,
    });

    if (profileError) {
      return { error: profileError.message };
    }

    // Insert preferences
    const { error: preferencesError } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: userId,
        ribeye_preferred: ribeye,
        ground_beef_preferred: groundBeef,
        filet_mignon_preferred: filetMignon,
        brisket_preferred: brisket,
        quantity: quantity,
        frequency: frequency,
        monthly_budget: monthlyBudget,
      });

    if (preferencesError) {
      return { error: preferencesError.message };
    }

    // Add a explicit redirect header to ensure redirection
    return redirect("/home", { headers });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return { error: "Failed to complete onboarding. Please try again." };
  }
};

// Validate address schema
const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(5, "Valid postal code is required"),
  deliveryInstructions: z.string().optional(),
});

// Validate preferences schema
const preferencesSchema = z.object({
  cuts: z.array(z.string()).min(1, "Select at least one cut of beef"),
  quantity: z.number().min(1, "Please select a quantity"),
  frequency: z.enum(["weekly", "bi-weekly", "monthly"], {
    required_error: "Please select a delivery frequency",
  }),
  monthlyBudget: z.number().min(1, "Please enter your monthly budget"),
});

export default function Onboarding() {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Address form
  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      deliveryInstructions: "",
    },
  });

  // Preferences form
  const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState<"weekly" | "bi-weekly" | "monthly">("weekly");
  const [monthlyBudget, setMonthlyBudget] = useState("");

  // Toggle beef cut selection
  const toggleCut = (cut: string) => {
    if (selectedCuts.includes(cut)) {
      setSelectedCuts(selectedCuts.filter((c) => c !== cut));
    } else {
      setSelectedCuts([...selectedCuts, cut]);
    }
  };

  // Handle address form submission
  const onAddressSubmit = (values: z.infer<typeof addressSchema>) => {
    setStep(2);
  };

  // Handle final form submission
  const onSubmit = async () => {
    if (selectedCuts.length === 0) {
      alert("Please select at least one cut of beef");
      return;
    }

    if (quantity < 1) {
      alert("Please select a valid quantity");
      return;
    }
    
    if (!frequency) {
      alert("Please select your preferred delivery frequency");
      return;
    }

    if (!monthlyBudget) {
      alert("Please enter your monthly budget");
      return;
    }

    // Create form data to submit
    const formData = new FormData();

    // Add address data
    const addressData = addressForm.getValues();
    formData.append("addressLine1", addressData.addressLine1);
    formData.append("addressLine2", addressData.addressLine2 || "");
    formData.append("city", addressData.city);
    formData.append("state", addressData.state);
    formData.append("postalCode", addressData.postalCode);
    formData.append(
      "deliveryInstructions",
      addressData.deliveryInstructions || ""
    );

    // Add selected cuts
    if (selectedCuts.includes("Premium Ribeye Steak"))
      formData.append("ribeye", "true");
    if (selectedCuts.includes("Ground Beef Bundle"))
      formData.append("groundBeef", "true");
    if (selectedCuts.includes("Filet Mignon"))
      formData.append("filetMignon", "true");
    if (selectedCuts.includes("Beef Brisket"))
      formData.append("brisket", "true");

    // Add quantities and frequency
    formData.append("quantity", quantity.toString());
    formData.append("frequency", frequency);
    formData.append("monthlyBudget", monthlyBudget);

    try {
      // Show loading state
      const submitButton = document.querySelector(
        'button[type="button"]:last-child'
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      // Use a direct form submission for more reliable server-side redirection
      const form = document.createElement("form");
      form.method = "post";
      form.action = "/onboarding";
      form.style.display = "none";

      // Append all form data to the form
      for (const [key, value] of formData.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      }

      // Add the form to the document and submit it
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              {step === 1
                ? "Step 1 of 2: Tell us where to deliver your fresh beef"
                : "Step 2 of 2: Select your beef preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <Form {...addressForm}>
                <form
                  onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={addressForm.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Beef Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={addressForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Steakville" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={addressForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="TX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={addressForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="w-28">
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={addressForm.control}
                    name="deliveryInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Leave at front door, gate code #1234, etc."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Continue to Preferences
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Select Your Preferred Cuts
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Premium Ribeye Steak",
                      "Ground Beef Bundle",
                      "Filet Mignon",
                      "Beef Brisket",
                    ].map((cut) => (
                      <div key={cut} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={cut.replace(/\s+/g, "")}
                          checked={selectedCuts.includes(cut)}
                          onChange={() => toggleCut(cut)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={cut.replace(/\s+/g, "")}>{cut}</Label>
                      </div>
                    ))}
                  </div>
                  {selectedCuts.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select at least one cut of beef
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Quantity & Frequency
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        How many pounds of beef?
                      </label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="h-9 px-3"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          className="mx-2 text-center w-20"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-9 px-3"
                        >
                          +
                        </Button>
                        <span className="ml-2">lbs</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        How often would you like delivery?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "weekly", label: "Weekly" },
                          { value: "bi-weekly", label: "Bi-Weekly" },
                          { value: "monthly", label: "Monthly" },
                        ].map((freq) => (
                          <Button
                            key={freq.value}
                            type="button"
                            variant={frequency === freq.value ? "default" : "outline"}
                            onClick={() => setFrequency(freq.value as "weekly" | "bi-weekly" | "monthly")}
                            className="h-auto py-2"
                          >
                            {freq.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Monthly Budget</h3>
                  <div className="flex items-center">
                    <span className="text-lg mr-2">$</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={onSubmit} className="flex-1">
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
