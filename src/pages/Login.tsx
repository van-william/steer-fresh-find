import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Beef } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="relative min-h-screen bg-background">
        {/* Sticky Header */}
        <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="font-serif text-2xl font-bold text-steer-brown">
                Steer
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="outline"
                  className="border-steer-green text-steer-green hover:bg-steer-green hover:text-white"
                  onClick={() => navigate("/")}
                >
                  <Beef className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-screen flex-col items-center justify-center pt-24 pb-8 px-4">
          <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-semibold text-steer-brown">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#8B6244", // steer-brown
                      brandAccent: "#95bb72", // steer-green
                      brandButtonText: "white",
                      inputBorder: "#e2e8f0",
                      inputText: "#1a202c",
                      inputPlaceholder: "#718096",
                    },
                    radii: {
                      borderRadiusButton: "0.375rem",
                      buttonBorderRadius: "0.375rem",
                      inputBorderRadius: "0.375rem",
                    },
                    space: {
                      inputPadding: "0.75rem",
                      buttonPadding: "0.75rem",
                    },
                    fontSizes: {
                      baseBodySize: "14px",
                      baseInputSize: "14px",
                      baseLabelSize: "14px",
                      baseButtonSize: "14px",
                    },
                  },
                },
                className: {
                  container: "auth-container",
                  button: "auth-button",
                  anchor: "auth-link",
                  divider: "auth-divider",
                  input: "auth-input",
                  label: "auth-label",
                  message: "auth-message",
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email address",
                    password_label: "Your password",
                    email_input_placeholder: "your@email.com",
                    password_input_placeholder: "Your password",
                    button_label: "Sign in",
                    social_provider_text: "Sign in with {{provider}}",
                    link_text: "Already have an account? Sign in",
                  },
                  sign_up: {
                    email_label: "Email address",
                    password_label: "Create a strong password",
                    email_input_placeholder: "your@email.com",
                    password_input_placeholder: "Your strong password",
                    button_label: "Create account",
                    social_provider_text: "Sign up with {{provider}}",
                    link_text: "Don't have an account? Sign up",
                  },
                },
              }}
              providers={["google", "facebook"]}
              redirectTo={window.location.origin}
            />
            <div className="mt-8 text-center">
              <Button
                variant="ghost"
                className="text-steer-brown hover:bg-steer-brown/10"
                onClick={() => navigate("/")}
              >
                Back to homepage
              </Button>
            </div>
          </div>
        </div>

        <footer className="mt-16 py-6 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Steer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } else {
    return (
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center">
        <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="font-serif text-2xl font-bold text-steer-brown">
                Steer
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="outline"
                  className="border-steer-green text-steer-green hover:bg-steer-green hover:text-white"
                  onClick={() => navigate("/")}
                >
                  <Beef className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md text-center">
          <h2 className="text-3xl font-serif font-semibold text-steer-brown">
            Successfully Logged In!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You are now signed into your account.
          </p>
          <div className="mt-8">
            <Button
              variant="default"
              className="bg-steer-brown text-white hover:bg-steer-brown/90"
              onClick={() => navigate("/")}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>

        <footer className="fixed bottom-0 w-full py-6 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Steer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
