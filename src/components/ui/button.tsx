import Spinner from "@/icons/spinner";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[16px] text-lg font-bold transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none gap-2 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-[#7E7AF2] text-white hover:bg-[#7a76da] font-normal",
        secondary: "bg-[#CFC4E7] text-black hover:bg-[#b0a5c7] font-normal",
        outline:
          "border border-[#7E7AF2] text-white hover:bg-[#7E7AF2] font-normal",
      },
      size: {
        sm: "h-[59px] px-[28px] rounded-[20px]",
        md: "h-[77px] px-[40px] rounded-[20.86px]",
        lg: "h-[79px] px-[70.9px] rounded-[26.59px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner />}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
