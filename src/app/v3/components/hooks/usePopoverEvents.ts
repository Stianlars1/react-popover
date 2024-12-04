import { RefObject, useEffect } from "react";

interface PopoverEventProps<
  T extends Element = Element,
  U extends Element = Element,
> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: RefObject<T>;
  contentRef: RefObject<U>;
  supportsPopover: boolean;
}

export const usePopoverEvents = <T extends Element, U extends Element>({
  isOpen,
  setIsOpen,
  triggerRef,
  contentRef,
  supportsPopover,
}: PopoverEventProps<T, U>) => {
  useEffect(() => {
    if (supportsPopover) return;

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, supportsPopover, setIsOpen, contentRef, triggerRef]);
};
