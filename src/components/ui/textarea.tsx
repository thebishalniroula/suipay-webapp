import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "bg-transparent text-white text-[17px] font-medium placeholder:text-[17px] placeholder:font-medium",
        " border-[#4f5170] border-[1px] rounded-[18px] px-4 outline-none",
        "focus-visible:border-[#2C2E4A] focus-visible:border-[1px] focus-visible:ring-2 focus-visible:ring-ring/30",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
