import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground",
          "bg-transparent dark:bg-input/30 text-white placeholder:text-[20px] placeholder:font-medium",
          " border-[#2C2E4A] border-[1px] rounded-[20px] h-[79px] px-4 text-base shadow-xs transition-all outline-none",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

          "focus-visible:border-[#2C2E4A] focus-visible:border-[1px] focus-visible:ring-2 focus-visible:ring-ring/30",

          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
