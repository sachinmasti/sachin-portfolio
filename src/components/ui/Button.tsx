import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ButtonLink({ className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      data-cursor="magnetic"
      className={cn(
        "inline-flex items-center justify-center rounded-[24px] bg-plum-voltage px-6 py-3.5 text-caption font-semibold uppercase tracking-[0.05em] text-bone transition hover:opacity-90",
        "focus:outline-none focus:ring-2 focus:ring-plum-voltage focus:ring-offset-2 focus:ring-offset-void",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
