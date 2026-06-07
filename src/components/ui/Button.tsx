import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export function ButtonLink({ className, variant = "primary", children, ...props }: ButtonLinkProps) {
  return (
    <a
      data-cursor="magnetic"
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black",
        variant === "primary"
          ? "bg-white text-black hover:bg-accent hover:text-white"
          : "border border-line bg-transparent text-white hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
