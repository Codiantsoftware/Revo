import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Create context for avatar props
const AvatarContext = React.createContext({
  size: "default",
  variant: "default",
});

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-8 w-8",
        sm: "h-11 w-11",
        default: "h-14 w-14",
        md: "h-12 w-12",
        lg: "h-16 w-16",
        xl: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full font-bold",
  {
    variants: {
      variant: {
        default: "bg-black text-primary-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary-500 text-primary-foreground",
        success: "bg-success-500 text-primary-foreground",
        warning: "bg-warning-500 text-primary-foreground",
        info: "bg-info-500 text-primary-foreground",
        danger: "bg-danger-500 text-primary-foreground",
        light: "bg-gray-300 text-dark-500 dark:bg-muted dark:text-light-200",
        destructive: "bg-destructive text-primary-foreground",
        // Light variants using custom CSS colors
        lightPrimary: "bg-primary-100 text-primary dark:bg-primary-500/20",
        lightSecondary:
          "bg-secondary-100 text-secondary-500 dark:bg-secondary-500/20",
        lightSuccess: "bg-success-100 text-success-500 dark:bg-success-500/20",
        lightWarning: "bg-warning-100 text-warning-500 dark:bg-warning-500/20",
        lightInfo: "bg-info-100 text-info-500 dark:bg-info-500/20",
        lightDanger: "bg-danger-100 text-danger-500 dark:bg-danger-500/20",
        lightGray: "bg-light-100 text-dark-400 dark:bg-light-500/20",
        lightDestructive: "bg-red-100 text-destructive dark:bg-red-500/20",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-md",
        md: "text-lg",
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "xs" | "sm" | "default" | "md" | "lg" | "xl";
    variant?: any;
  }
>(({ className, size = "default", variant = "default", ...props }, ref) => (
  <AvatarContext.Provider value={{ size, variant }}>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  </AvatarContext.Provider>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    variant?: any;
    size?: any;
  }
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(AvatarContext);
  const effectiveSize = size || context.size;
  const effectiveVariant = variant || context.variant;

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        avatarFallbackVariants({
          variant: effectiveVariant,
          size: effectiveSize,
        }),
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
