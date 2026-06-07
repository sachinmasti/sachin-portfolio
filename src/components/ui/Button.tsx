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
        "inline-flex items-center justify-center rounded-[24px] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] transition duration-300",
        "focus:outline-none focus:ring-2 focus:ring-plum-voltage focus:ring-offset-2 focus:ring-offset-void",
        variant === "primary"
          ? "bg-plum-voltage text-bone hover:opacity-90"
          : "border border-amber-spark bg-transparent text-amber-spark hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
