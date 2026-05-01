import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import DiagnosticForm from "@/components/landing/DiagnosticForm";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size="cta"
          className={cn(
            "font-semibold leading-tight whitespace-normal text-center w-full",
            className,
          )}
        >
          <span>{label}</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-7 rounded-2xl">
        <DialogHeader className="text-left space-y-2">
          <DialogTitle className="text-xl font-extrabold sm:text-2xl">
            Запишитесь на диагностику
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Если вы руководитель медицинской клиники и хотите{" "}
            <span className="font-semibold text-foreground">увеличить выручку</span>{" "}
            и обойти конкурентов — оставьте заявку, разберём вашу клинику.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <DiagnosticForm ctaId={ctaId} ctaName={resolvedCtaName} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScrollToFormButton;
