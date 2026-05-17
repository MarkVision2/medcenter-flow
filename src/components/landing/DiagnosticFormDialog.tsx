import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DiagnosticForm from "@/components/landing/DiagnosticForm";

interface DiagnosticFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ctaId?: number;
  ctaName?: string;
}

const DiagnosticFormDialog = ({
  open,
  onOpenChange,
  ctaId,
  ctaName,
}: DiagnosticFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Suspense
            fallback={
              <div className="rounded-2xl bg-muted p-5 text-center text-sm font-semibold text-muted-foreground">
                Загружаем форму...
              </div>
            }
          >
            <DiagnosticForm ctaId={ctaId} ctaName={ctaName} />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticFormDialog;
