import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "77472842595";
const DEFAULT_MESSAGE =
  "Здравствуйте, Юрий! Хочу записаться на диагностику клиники по системе «Врач на миллион»";

interface WhatsAppButtonProps {
  label?: string;
  className?: string;
  fullWidth?: boolean;
  variant?: "whatsapp" | "cta-orange";
}

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.11 1.6 5.9L0 24l6.42-1.68a11.83 11.83 0 0 0 5.62 1.43h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43ZM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.81 1 1.02-3.71-.23-.38a9.45 9.45 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.71c0 5.23-4.26 9.49-9.49 9.49Zm5.2-7.1c-.28-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.13-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.39 1.02 2.74 1.16 2.93.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.36-.07-.13-.26-.21-.54-.35Z" />
  </svg>
);

const WhatsAppButton = ({
  label = "Хочу получить доступ к системе «Врач на миллион»",
  className,
  fullWidth = true,
  variant = "whatsapp",
}: WhatsAppButtonProps) => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <Button
      asChild
      variant={variant}
      size="cta"
      className={cn(
        "font-semibold leading-tight whitespace-normal text-center",
        fullWidth && "w-full",
        className,
      )}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span>{label}</span>
      </a>
    </Button>
  );
};

export default WhatsAppButton;
