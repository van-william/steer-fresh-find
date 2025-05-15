import { Toaster as Sonner, toast } from "sonner"

// You can set a static theme here if you want, e.g. theme="light" or theme="dark"
type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      // theme="light" // Uncomment and set to "light" or "dark" if you want a static theme
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
