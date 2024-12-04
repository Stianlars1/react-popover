import { ReactElement, ReactNode } from "react";
import { cx } from "@/app/v2/components/popover/utils/utils";

interface PopoverTriggerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  toggle?: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const PopoverTrigger = ({
  children,
  className,
  isOpen,
  toggle,
  triggerRef,
}: PopoverTriggerProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      if (toggle) {
        toggle();
      }
    }
  };

  return (
    <button
      ref={triggerRef}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={cx(className)}
    >
      {children}
    </button>
  );
};

const isPopoverTrigger = (
  element: ReactElement,
): element is ReactElement<PopoverTriggerProps> =>
  (element.type as any).displayName === "PopoverTrigger";

PopoverTrigger.displayName = "PopoverTrigger";
export { PopoverTrigger, isPopoverTrigger };
