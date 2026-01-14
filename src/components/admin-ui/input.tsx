import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type InputSize = "sm" | "default" | "lg";
export type IconPosition = "none" | "left" | "right";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  iconPosition?: IconPosition;

  icon?: React.ReactElement<{ className?: string }>;
  className?: string;
}

type InputVariants = {
  size?: InputSize;
  iconPosition?: IconPosition;
};

const inputVariants = cva(
  "peer file:text-foreground text-dark-500 placeholder:text-placeholder selection:bg-primary selection:text-primary-foreground border border-input flex w-full min-w-0 rounded-sm bg-transparent transition-[color,box-shadow] outline-hidden file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:text-placeholder disabled:cursor-not-allowed disabled:opacity-50 focus:[&:not([disabled]):not([readonly])]:border-primary focus:[&:not([disabled]):not([readonly])]:shadow-[0_0_0_0.2rem_rgba(149,100,224,0.15)] aria-invalid:ring-destructive/20 aria-invalid:border-destructive mb-0",
  {
    variants: {
      size: {
        sm: "h-9 py-1 text-sm file:h-6",
        default: "h-11 py-1 text-[15px] file:h-7",
        lg: "h-13 py-2 text-base file:h-8",
      },
      iconPosition: {
        none: "",
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      { size: "sm", iconPosition: "none", class: "px-3" },
      { size: "sm", iconPosition: "left", class: "pl-9 pr-3" },
      { size: "sm", iconPosition: "right", class: "pl-3 pr-9" },

      { size: "default", iconPosition: "none", class: "px-4" },
      { size: "default", iconPosition: "left", class: "pl-11 pr-4" },
      { size: "default", iconPosition: "right", class: "pl-4 pr-11" },

      { size: "lg", iconPosition: "none", class: "px-5" },
      { size: "lg", iconPosition: "left", class: "pl-13 pr-5" },
      { size: "lg", iconPosition: "right", class: "pl-5 pr-13" },
    ],
    defaultVariants: {
      size: "default",
      iconPosition: "none",
    },
  }
) as (props?: InputVariants) => string;

const iconSizeClasses: Record<InputSize, string> = {
  sm: "w-[15px] h-[15px] text-[15px]",
  default: "w-[18px] h-[18px] text-[18px]",
  lg: "w-[22px] h-[22px] text-[22px]",
};

const iconSize: Record<InputSize, string> = {
  sm: "size-9",
  default: "size-11",
  lg: "size-13",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize = "default",
      iconPosition = "none",
      icon,
      ...props
    },
    ref
  ) => {
    const actualIconPosition: IconPosition = icon ? iconPosition : "none";

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({
              size: inputSize,
              iconPosition: actualIconPosition,
            }),
            className
          )}
          {...props}
        />

        {icon && actualIconPosition !== "none" && (
          <div
            className={cn(
              "form-icon absolute inset-y-0 flex items-center justify-center text-dark-300 pointer-events-none",
              actualIconPosition === "right" ? "right-0" : "left-0",
              iconSize[inputSize]
            )}
          >
            {React.cloneElement(icon, {
              className: cn(iconSizeClasses[inputSize], icon.props?.className),
            })}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
