"use client";
import { usePopover } from "@/app/v1/components/popover/context/context";

interface PopoverDismissProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverDismiss({ children, className }: PopoverDismissProps) {
  const { id } = usePopover();

  return (
    <button
      className={className}
      popoverTarget={id} // Correct React camelCase
      popoverTargetAction="hide" // Correct React camelCase
    >
      {children}
    </button>
  );
}
