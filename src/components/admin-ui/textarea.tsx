import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaSize = "sm" | "default" | "lg"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize
  className?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "border border-input placeholder:text-placeholder aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-sm bg-transparent px-4 py-2 text-[15px] transition-[color,box-shadow] outline-hidden disabled:cursor-not-allowed disabled:opacity-50 disabled:text-placeholder",
          "focus:[&:not([disabled]):not([readonly])]:border-primary focus:[&:not([disabled]):not([readonly])]:shadow-[0_0_0_0.2rem_rgba(149,100,224,0.15)]",
          "aria-invalid:ring-destructive/20 mb-0",
          size === "sm" && "py-2 px-3 text-sm",
          size === "default" && "py-2 px-4 text-[15px]",
          size === "lg" && "py-3 px-5 text-base",
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
