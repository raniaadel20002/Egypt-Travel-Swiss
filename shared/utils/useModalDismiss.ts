import { useEffect } from "react";

export interface UseModalDismissOptions {
  isOpen: boolean;
  onClose: () => void;
  disabled?: boolean;
}

export function useModalDismiss({
  isOpen,
  onClose,
  disabled = false,
}: UseModalDismissOptions) {
  useEffect(() => {
    if (!isOpen || disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, disabled]);
}
