import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router-dom";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";

const queryClient = new QueryClient();

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Steer | Farm Fresh Beef Direct to Your Door</title>
        <meta
          name="description"
          content="Steer connects consumers directly with cattle farmers for premium, farm-fresh beef. Join our waitlist today!"
        />
        <meta name="author" content="Steer" />
        <link rel="icon" type="image/svg+xml" href="/cow.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// App component provides the React context providers
function App({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function Root() {
  return (
    <Layout>
      <App>
        <Outlet />
      </App>
    </Layout>
  );
}
