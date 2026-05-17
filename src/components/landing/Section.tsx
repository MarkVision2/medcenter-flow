import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: "default" | "muted" | "accent";
}

const toneMap = {
  default: "bg-background",
  muted: "bg-muted",
  accent: "bg-accent-soft",
} as const;

const Section = ({ children, className, tone = "default", ...rest }: SectionProps) => {
  return (
    <section
      className={cn("w-full px-5 py-12 sm:py-16", toneMap[tone], className)}
      {...rest}
    >
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </section>
  );
};

export default Section;