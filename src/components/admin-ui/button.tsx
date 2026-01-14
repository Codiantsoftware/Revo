import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[13px] font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-hidden focus-visible:ring-hidden focus-visible:outline-hidden aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer shadow-xs",
  {
    variants: {
      variant: {
        default:
          "bg-black text-primary-foreground dark:bg-light-50 dark:text-light-800 dark:hover:bg-light-100",
        primary: "bg-primary text-primary-foreground hover:bg-primary-600",
        danger: "bg-danger-500 text-primary-foreground hover:bg-danger-600",
        warning: "bg-warning-500 text-primary-foreground hover:bg-warning-600",
        success: "bg-success-500 text-primary-foreground hover:bg-success-600",
        info: "bg-info-500 text-primary-foreground hover:bg-info-600",
        light:
          "bg-light-100 text-light-800 hover:bg-light-200 dark:bg-muted dark:text-light-200 dark:hover:bg-[#435771]",
        outline:
          "border border-black text-black hover:bg-black hover:text-primary-foreground dark:border-light-50 dark:text-light-50 dark:hover:bg-light-50 dark:hover:text-light-800",
        outlinePrimary:
          "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        outlineInfo:
          "border border-info-500 text-info-500 hover:bg-info-500 hover:text-primary-foreground",
        outlineDanger:
          "border border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-primary-foreground",
        outlineWarning:
          "border border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-primary-foreground",
        outlineSuccess:
          "border border-success-500 text-success-500 hover:bg-success-500 hover:text-primary-foreground",
        outlineLight:
          "shadow-none border border-light-200 text-light-500 bg-white hover:bg-light-200 hover:text-light-800 dark:border-muted dark:bg-transparent dark:text-light-200 dark:hover:bg-[#435771] dark:hover:border-[#435771]",
        destructive:
          "bg-destructive text-primary-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        secondary:
          "bg-secondary-500 text-primary-foreground hover:bg-secondary-600",
        ghost:
          "text-primary hover:text-primary-600 px-2 hover:bg-accent shadow-none dark:hover:bg-muted/30",
        link: "text-primary hover:text-primary-800 shadow-none font-semibold",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-11 px-6 py-3 text-[15px]",
        xl: "h-13 px-8 py-3 text-[18px]",
        icon: "size-9 text-[20px]",
        iconSm: "size-8 text-[16px]",
        iconLg: "size-11 text-[24px]",
        iconXl: "size-13 text-[28px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-slot="button"
        {...props}
      />
    );
  }
);
ButtonComponent.displayName = "Button";

export const Button = Object.assign(ButtonComponent, {
  variants: buttonVariants,
}) as typeof ButtonComponent & {
  variants: typeof buttonVariants;
};

export { buttonVariants };
