import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

export type TabsVariant = "default" | "pill"

export interface TabsProps extends TabsPrimitive.TabsProps {
  variant?: TabsVariant
  className?: string
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant
  className?: string
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: TabsVariant
  icon?: React.ReactNode
  className?: string
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  className?: string
}


const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent w-fit border-b border-border -mb-[2px]",
        pill: "w-fit rounded-full border border-border bg-background p-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 px-4 py-2 text-[15px] text-dark-400 font-semibold whitespace-nowrap transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-b-2 border-transparent data-[state=active]:text-primary data-[state=active]:border-primary",
        pill:
          "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TabsContextValue {
  variant: TabsVariant
}

const TabsContext = React.createContext<TabsContextValue>({ variant: "default" })

function Tabs({ className, variant = "default", ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({ className, variant, ...props }: TabsListProps) {
  const context = React.useContext(TabsContext)
  const tabsVariant = variant || context.variant

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant: tabsVariant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  variant,
  icon,
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  const tabsVariant = variant || context.variant

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant: tabsVariant }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-hidden", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
