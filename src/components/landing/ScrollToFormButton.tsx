import { lazy, Suspense, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DiagnosticFormDialog = lazy(() => import("@/components/landing/DiagnosticFormDialog"));

interface ScrollToFormButtonProps {
  label?: string;
  className?: string;
  variant?: "whatsapp" | "cta-orange";
  ctaId?: number;
  ctaName?: string;
}

const ScrollToFormButton = ({
  label = "Записаться на диагностику",
  className,
  variant = "whatsapp",
  ctaId,
  ctaName,
}: ScrollToFormButtonProps) => {
  const [open, setOpen] = useState(false);
  const resolvedCtaName = ctaName ?? label;

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size="cta"
        className={cn(
          "font-semibold leading-tight whitespace-normal text-center w-full",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        <ArrowRight className="h-5 w-5" />
      </Button>

      {open && (
        <Suspense fallback={null}>
          <DiagnosticFormDialog
            open={open}
            onOpenChange={setOpen}
            ctaId={ctaId}
            ctaName={resolvedCtaName}
          />
        </Suspense>
      )}
    </>
  );
};

export default ScrollToFormButton;
