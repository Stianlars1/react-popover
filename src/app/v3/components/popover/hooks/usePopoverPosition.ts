import { RefObject, useCallback, useEffect } from "react";
import { AllowedTriggerRefType } from "@/app/v3/components/popover/types/types";

interface PopoverRefs<T extends AllowedTriggerRefType> {
  triggerRef: RefObject<T>;
  contentRef: RefObject<HTMLDivElement>;
}

export const usePopoverPosition = <T extends AllowedTriggerRefType>(
  { triggerRef, contentRef }: PopoverRefs<T>,
  isOpen: boolean,
  offsetY: number = 2,
) => {
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const popoverWidth = contentRef.current.offsetWidth;
    const triggerRect = triggerRef.current.getBoundingClientRect();

    // Position the popover below the trigger button and align its right edge
    // with the trigger's right edge
    contentRef.current.style.position = "fixed";
    contentRef.current.style.transform = `translate3d(${
      triggerRect.right - popoverWidth
    }px, ${triggerRect.top + triggerRect.height + offsetY}px, 0)`;
  }, [triggerRef, contentRef, offsetY]);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const scrollListener = () => updatePosition();
    const resizeListener = () => updatePosition();

    window.addEventListener("scroll", scrollListener, { passive: true });
    window.addEventListener("resize", resizeListener, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", resizeListener);
    };
  }, [isOpen, updatePosition]);

  return { updatePosition };
};
