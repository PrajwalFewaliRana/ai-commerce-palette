import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "font-sans text-small font-semibold",
          description: "font-sans text-caption group-[.toast]:text-muted-foreground",
          actionButton:
            "font-sans text-caption font-semibold group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "font-sans text-caption font-semibold group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
