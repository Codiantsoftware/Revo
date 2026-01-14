import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean
  className?: string
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

function Card({ className, border = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-xs shadow-[0px_1px_3px_0px_rgba(54,74,99,0.1)]",
        border ? "border border-border" : "border-none",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "px-4 lg:px-6 py-2 lg:py-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] flex-wrap gap-2",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-bold text-lg lg:text-xl text-dark-500 mb-2 lg:mb-3",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-dark-400 text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 lg:px-6 py-2 lg:py-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-4 lg:px-6 py-2 lg:py-3", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
