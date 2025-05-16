import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/forgot-password": {};
  "/update-password": {};
  "/auth/confirm": {};
  "/auth/error": {};
  "/protected": {};
  "/catchall": {};
  "/sign-up": {};
  "/logout": {};
  "/login": {};
};