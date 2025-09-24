import * as React from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";

// Base responsive card with comprehensive breakpoint support
interface ResponsiveCardProps extends React.ComponentProps<"div"> {
  variant?: "default" | "glass" | "elevated" | "minimal" | "gradient";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  breakpoint?: "mobile-first" | "desktop-first" | "adaptive";
  hover?: boolean;
  animation?: boolean;
  index?: number;
}

function ResponsiveCard({ 
  className, 
  variant = "default",
  size = "md",
  breakpoint = "mobile-first",
  hover = true,
  animation = true,
  index = 0,
  children,
  ...props 
}: ResponsiveCardProps) {
  const baseClasses = "relative flex flex-col transition-all duration-300 ease-in-out";
  
  // Responsive sizing system
  const sizeClasses = {
    sm: "w-full max-w-xs sm:max-w-sm",
    md: "w-full max-w-sm sm:max-w-md lg:max-w-lg",
    lg: "w-full max-w-md sm:max-w-lg lg:max-w-xl",
    xl: "w-full max-w-lg sm:max-w-xl lg:max-w-2xl",
    full: "w-full"
  };

  // Variant styles with responsive considerations
  const variantClasses = {
    default: "bg-card text-card-foreground border border-border rounded-xl",
    glass: "glass border border-white/10 rounded-xl backdrop-blur-xl",
    elevated: "bg-card text-card-foreground border border-border rounded-xl shadow-lg hover:shadow-xl",
    minimal: "bg-transparent border-0 rounded-none",
    gradient: "bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/20 rounded-xl backdrop-blur-sm"
  };

  // Responsive padding system
  const paddingClasses = {
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 lg:p-6",
    lg: "p-5 sm:p-6 lg:p-8",
    xl: "p-6 sm:p-8 lg:p-10",
    full: "p-4 sm:p-6 lg:p-8 xl:p-10"
  };

  // Hover effects (responsive)
  const hoverClasses = hover ? 
    "hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-xl hover:border-white/30" : 
    "";

  // Animation wrapper
  
  const animationProps = animation ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.5, 
      delay: index * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  } : {};

  function splitMotionProps(props: any) {
    const {
      onAnimationStart,
      onAnimationEnd,
      onTransitionEnd,
      onViewportEnter,
      onViewportLeave,
      className,
      children,
      variant,
      size,
      breakpoint,
      hover,
      animation,
      index,
      ...rest
    } = props;

    return rest;
  }

  
    const commonClasses = cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      paddingClasses[size],
      hoverClasses,
      "focus-within:ring-2 focus-within:ring-purple-400/50 focus-within:border-purple-400/50",
      "relative", // Add relative positioning for framer-motion
      className
    );

    const shimmer = hover && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none rounded-xl" />
    );

    if (animation) {
      return (
        <motion.div
          className={commonClasses}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          {...splitMotionProps(props)} //  filtered props
        >
          {children}
          {shimmer}
        </motion.div>
      );
    }

    return (
      <div className={commonClasses} {...props}>
        {children}
        {shimmer}
      </div>
    );

  }


// Responsive card header with adaptive typography
interface ResponsiveCardHeaderProps extends React.ComponentProps<"div"> {
  responsive?: boolean;
}

function ResponsiveCardHeader({ 
  className, 
  responsive = true,
  ...props 
}: ResponsiveCardHeaderProps) {
  const responsiveClasses = responsive ? 
    "flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 lg:mb-6" :
    "";

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        responsiveClasses,
        className
      )}
      {...props}
    />
  );
}

// Responsive card title with adaptive font sizes
interface ResponsiveCardTitleProps extends React.ComponentProps<"h3"> {
  size?: "sm" | "md" | "lg" | "xl";
}

function ResponsiveCardTitle({ 
  className, 
  size = "md",
  ...props 
}: ResponsiveCardTitleProps) {
  const sizeClasses = {
    sm: "text-sm sm:text-base lg:text-lg",
    md: "text-base sm:text-lg lg:text-xl",
    lg: "text-lg sm:text-xl lg:text-2xl",
    xl: "text-xl sm:text-2xl lg:text-3xl"
  };

  return (
    <h3
      className={cn(
        "font-semibold leading-tight",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

// Responsive card description with adaptive typography
function ResponsiveCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-sm sm:text-base leading-relaxed",
        "line-clamp-2 sm:line-clamp-3 lg:line-clamp-none",
        className
      )}
      {...props}
    />
  );
}

// Responsive card content with adaptive spacing
interface ResponsiveCardContentProps extends React.ComponentProps<"div"> {
  spacing?: "sm" | "md" | "lg";
}

function ResponsiveCardContent({ 
  className, 
  spacing = "md",
  ...props 
}: ResponsiveCardContentProps) {
  const spacingClasses = {
    sm: "space-y-2 sm:space-y-3",
    md: "space-y-3 sm:space-y-4 lg:space-y-6",
    lg: "space-y-4 sm:space-y-6 lg:space-y-8"
  };

  return (
    <div
      className={cn(
        "flex-1",
        spacingClasses[spacing],
        className
      )}
      {...props}
    />
  );
}

// Responsive card footer with adaptive layout
interface ResponsiveCardFooterProps extends React.ComponentProps<"div"> {
  direction?: "row" | "column" | "responsive";
}

function ResponsiveCardFooter({ 
  className, 
  direction = "responsive",
  ...props 
}: ResponsiveCardFooterProps) {
  const directionClasses = {
    row: "flex flex-row items-center justify-between",
    column: "flex flex-col space-y-2",
    responsive: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4"
  };

  return (
    <div
      className={cn(
        "mt-auto pt-3 sm:pt-4 lg:pt-6",
        directionClasses[direction],
        className
      )}
      {...props}
    />
  );
}

// Responsive card grid container
interface ResponsiveCardGridProps extends React.ComponentProps<"div"> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

function ResponsiveCardGrid({ 
  className,
  columns = 3,
  gap = "md",
  breakpoints,
  ...props 
}: ResponsiveCardGridProps) {
  const gapClasses = {
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-5 lg:gap-6",
    lg: "gap-5 sm:gap-6 lg:gap-8",
    xl: "gap-6 sm:gap-8 lg:gap-10"
  };

  // Default responsive breakpoints
  const defaultBreakpoints = {
    sm: Math.min(2, columns),
    md: Math.min(3, columns),
    lg: columns,
    xl: columns
  };

  const finalBreakpoints = { ...defaultBreakpoints, ...breakpoints };

  const gridClasses = `grid grid-cols-1 sm:grid-cols-${finalBreakpoints.sm} md:grid-cols-${finalBreakpoints.md} lg:grid-cols-${finalBreakpoints.lg} xl:grid-cols-${finalBreakpoints.xl}`;

  return (
    <div
      className={cn(
        gridClasses,
        gapClasses[gap],
        "w-full",
        className
      )}
      {...props}
    />
  );
}

// Responsive card masonry layout
interface ResponsiveCardMasonryProps extends React.ComponentProps<"div"> {
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg";
}

function ResponsiveCardMasonry({ 
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
  ...props 
}: ResponsiveCardMasonryProps) {
  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 sm:gap-5",
    lg: "gap-5 sm:gap-6 lg:gap-8"
  };

  const columnClasses = `columns-${columns.sm || 1} md:columns-${columns.md || 2} lg:columns-${columns.lg || 3} xl:columns-${columns.xl || 4}`;

  return (
    <div
      className={cn(
        columnClasses,
        gapClasses[gap],
        "w-full space-y-4 sm:space-y-5 lg:space-y-6",
        className
      )}
      {...props}
    />
  );
}

// Adaptive card that changes layout based on content
interface AdaptiveCardProps extends ResponsiveCardProps {
  layout?: "vertical" | "horizontal" | "adaptive";
  imagePosition?: "top" | "left" | "right" | "background";
}

function AdaptiveCard({ 
  layout = "adaptive",
  imagePosition = "top",
  className,
  children,
  ...props 
}: AdaptiveCardProps) {
  const layoutClasses = {
    vertical: "flex flex-col",
    horizontal: "flex flex-col sm:flex-row",
    adaptive: "flex flex-col lg:flex-row"
  };

  return (
    <ResponsiveCard 
      className={cn(
        layoutClasses[layout],
        className
      )}
      {...props}
    >
      {children}
    </ResponsiveCard>
  );
}

export {
  ResponsiveCard,
  ResponsiveCardHeader,
  ResponsiveCardTitle,
  ResponsiveCardDescription,
  ResponsiveCardContent,
  ResponsiveCardFooter,
  ResponsiveCardGrid,
  ResponsiveCardMasonry,
  AdaptiveCard
};