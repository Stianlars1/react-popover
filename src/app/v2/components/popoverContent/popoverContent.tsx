import { CSSProperties, ReactElement, ReactNode, useEffect } from "react";
import { cx } from "@/app/v2/components/popover/utils/utils";

interface PopoverContentProps {
  children: ReactNode;
  offsetY?: number;
  isOpen?: boolean;
  popoverRef?: React.RefObject<HTMLDivElement>;
  closePopover?: () => void;
  position?: { top: number; right: number };
  className?: string;
}

const PopoverContent = ({
  children,
  offsetY = 4,
  isOpen,
  popoverRef,
  position,
  className,
}: PopoverContentProps) => {
  useEffect(() => {
    if (isOpen && popoverRef?.current) {
      popoverRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const style: CSSProperties = {
    position: "absolute",
    top: `calc(100% + ${offsetY}px)`,
    right: 0,
  };

  return (
    <div
      ref={popoverRef}
      className={cx(className)}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      style={style}
    >
      {children}
    </div>
  );
};

PopoverContent.displayName = "PopoverContent";

const isPopoverContent = (
  element: ReactElement,
): element is ReactElement<PopoverContentProps> =>
  (element.type as any).displayName === "PopoverContent";

export { PopoverContent, isPopoverContent };
