import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs rounded-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-hidden focus-visible:outline-hidden aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-primary-foreground dark:bg-light-50 dark:text-light-800 dark:hover:bg-light-100",
        primary: "border-transparent bg-primary text-primary-foreground",
        danger: "border-transparent bg-danger-500 text-primary-foreground",
        warning: "border-transparent bg-warning-500 text-primary-foreground",
        success: "border-transparent bg-success-500 text-primary-foreground",
        info: "border-transparent bg-info-500 text-primary-foreground",
        light:
          "border-transparent bg-gray-300 text-dark-500 dark:bg-muted dark:text-light-200",
        dim: "border-transparent bg-gray-100/50 text-gray-700 dark:bg-gray-500/20 dark:text-light-300",
        dimPrimary:
          "border-transparent bg-primary-100/50 text-primary dark:bg-primary-500/20",
        dimDanger:
          "border-transparent bg-danger-100/50 text-danger-500 dark:bg-danger-500/20",
        dimWarning:
          "border-transparent bg-warning-100/50 text-warning-500 dark:bg-warning-500/20",
        dimSuccess:
          "border-transparent bg-success-100/50 text-success-500 dark:bg-success-500/20",
        dimInfo:
          "border-transparent bg-info-100/50 text-info-500 dark:bg-info-500/20",
        dimSecondary:
          "border-transparent bg-secondary-100/50 text-secondary-500 dark:bg-secondary-500/20",
        dimLight:
          "border-transparent bg-light-100/50 text-light-600 dark:bg-light-500/20 dark:text-light-400",
        dimDestructive:
          "border-transparent bg-red-100/50 text-red-600 dark:bg-red-500/20",
        outline:
          "border border-black text-black dark:border-light-50 dark:text-light-50",
        outlinePrimary: "border border-primary text-primary",
        outlineSecondary: "border border-secondary-500 text-secondary-500",
        outlineDestructive: "border border-destructive text-destructive",
        outlineInfo: "border border-info-500 text-info-500",
        outlineDanger: "border border-danger-500 text-danger-500",
        outlineWarning: "border border-warning-500 text-warning-500",
        outlineSuccess: "border border-success-500 text-success-500",
        outlineLight:
          "border border-gray-300 text-dark-400 bg-transparent dark:border-muted dark:text-light-200",
        outlineDim:
          "border border-gray-500 text-gray-600 bg-gray-100/50 dark:bg-gray-500/20 dark:text-light-300",
        outlineDimPrimary:
          "border border-primary-500 text-primary bg-primary-100/50 dark:bg-primary-500/20",
        outlineDimDanger:
          "border border-danger-500 text-danger-500 bg-danger-100/50 dark:bg-danger-500/20",
        outlineDimWarning:
          "border border-warning-500 text-warning-500 bg-warning-100/50 dark:bg-warning-500/20",
        outlineDimSuccess:
          "border border-success-500 text-success-500 bg-success-100/50 dark:bg-success-500/20",
        outlineDimInfo:
          "border border-info-500 text-info-500 bg-info-100/50 dark:bg-info-500/20",
        outlineDimSecondary:
          "border border-secondary-500 text-secondary-500 bg-secondary-100/50 dark:bg-secondary-500/20",
        outlineDimLight:
          "border border-light-500 text-light-600 bg-light-100/50 dark:bg-light-500/20 dark:text-light-400",
        outlineDimDestructive:
          "border border-red-500 text-red-600 bg-red-100/50 dark:bg-red-500/20",
        destructive:
          "border-transparent bg-destructive text-primary-foreground focus-visible:ring-destructive/20",
        secondary:
          "border-transparent bg-secondary-500 text-primary-foreground",
        ghost: "text-primary bg-transparent",
        link: "text-primary bg-transparent underline",
      },
      size: {
        default: "px-2 py-1 text-xs",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-sm",
        xl: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
