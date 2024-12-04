// hooks/usePopoverState.ts
import { RefObject, useEffect, useState } from "react";

interface UsePopoverStateProps {
  contentRef: RefObject<HTMLDivElement>;
  supportsPopover: boolean;
  onStateChange?: (isOpen: boolean) => void;
}

export const usePopoverState = ({
  contentRef,
  supportsPopover,
  onStateChange,
}: UsePopoverStateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!supportsPopover || !contentRef.current) return;

    const popoverElement = contentRef.current;

    const handleToggle = () => {
      const isCurrentlyOpen = popoverElement.matches(":popover-open");
      setIsOpen(isCurrentlyOpen);
      onStateChange?.(isCurrentlyOpen);
    };

    popoverElement.addEventListener("toggle", handleToggle);

    return () => {
      popoverElement.removeEventListener("toggle", handleToggle);
    };
  }, [supportsPopover, contentRef, onStateChange]);

  const handleToggle = () => {
    console.log("handleToggle");
    if (!contentRef.current) return;

    const newState = !isOpen;

    if (supportsPopover) {
      console.log("supportsPopover");
      if (newState) {
        contentRef.current.showPopover();
      } else {
        contentRef.current.hidePopover();
      }
    }
    console.log("doesnt support popover");

    setIsOpen(newState);
    onStateChange?.(newState);
  };

  return {
    isOpen,
    setIsOpen,
    handleToggle,
  };
};
