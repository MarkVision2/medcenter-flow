import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BannerProps {
  children: ReactNode;
  className?: string;
  /** italic + жёлтый текст на синем — как в референсе */
  italic?: boolean;
}

/**
 * "Колхозная" продающая плашка-баннер: синий фон, жёлтый жирный текст, на всю ширину.
 * Используется для главных тезисов / якорей внимания.
 */
const Banner = ({ children, className, italic = true }: BannerProps) => {
  return (
    <div
      className={cn(
        "rounded-md bg-banner px-5 py-5 text-center sm:px-6 sm:py-6",
        "text-banner-foreground font-extrabold uppercase",
        "text-sm leading-tight sm:text-xl md:text-2xl",
        italic && "italic",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Banner;