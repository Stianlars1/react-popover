import { RefObject, useEffect } from "react";

interface PopoverEventProps<T extends HTMLElement = HTMLElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: RefObject<T>;
  contentRef: RefObject<HTMLDivElement>;
  supportsPopover: boolean;
}

export const usePopoverEvents = <T extends HTMLElement>({
  isOpen,
  setIsOpen,
  triggerRef,
  contentRef,
  supportsPopover,
}: PopoverEventProps<T>) => {
  useEffect(() => {
    console.log("\nusePopoverEvents");
    if (supportsPopover) {
      console.log("supports Popover API");
      return;
    }

    console.log("does not support Popover API");

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, supportsPopover, setIsOpen, contentRef, triggerRef]);
};
