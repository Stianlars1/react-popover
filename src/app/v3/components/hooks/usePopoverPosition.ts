import { RefObject, useCallback, useEffect } from "react";

interface PopoverRefs<T extends HTMLElement = HTMLElement> {
  triggerRef: RefObject<T>;
  contentRef: RefObject<HTMLDivElement>;
}

export const usePopoverPosition = <T extends HTMLElement>(
  { triggerRef, contentRef }: PopoverRefs<T>,
  isOpen: boolean,
  offsetY: number = 2,
) => {
  const measurePopoverContent = useCallback(() => {
    if (!contentRef.current) return 0;

    const originalStyles = {
      visibility: contentRef.current.style.visibility,
      display: contentRef.current.style.display,
      position: contentRef.current.style.position,
    };

    Object.assign(contentRef.current.style, {
      visibility: "hidden",
      display: "flex",
      position: "absolute",
    });

    const width = contentRef.current.offsetWidth;
    Object.assign(contentRef.current.style, originalStyles);

    return width;
  }, [contentRef]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = measurePopoverContent();
    const scrollX = window.scrollX;

    const top = triggerRect.bottom + offsetY;
    const left = triggerRect.left + scrollX + triggerRect.width - popoverWidth;

    contentRef.current.style.top = `${top}px`;
    contentRef.current.style.left = `${left}px`;
  }, [triggerRef, contentRef, offsetY, measurePopoverContent]);

  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isOpen) {
        requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate);

    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate);
    };
  }, [isOpen, updatePosition]);

  return { updatePosition };
};
