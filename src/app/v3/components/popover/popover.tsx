"use client";
import styles from "./popover.module.css";
import {
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

interface PopoverProps {
  triggerTitle: string;
  content: ReactNode;
  offsetY?: number;
}

export const Popover = ({
  triggerTitle,
  content,
  offsetY = 2,
}: PopoverProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uniqueId = useId();

  const handleTriggerClick = () => {
    if (!popoverContentRef.current) return;

    if (isOpen) {
      popoverContentRef.current.hidePopover();
    } else {
      popoverContentRef.current.showPopover();
    }
    updatePosition();
    setIsOpen(!isOpen);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !popoverContentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    console.log("triggerRect", triggerRect);
    console.log("scrollX", scrollX);
    console.log("scrollY", scrollY);
    const top = triggerRect.bottom + offsetY;
    const left =
      triggerRect.left +
      scrollX +
      triggerRect.width -
      popoverContentRef.current.offsetWidth;

    popoverContentRef.current.style.top = `${top}px`;
    popoverContentRef.current.style.left = `${left}px`;
  };

  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate);

    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate);
    };
  }, [isOpen]);

  return (
    <div className={styles.popover}>
      <button
        ref={triggerRef}
        className={styles.popoverTrigger}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-controls={uniqueId}
      >
        {triggerTitle}
      </button>
      <div
        ref={popoverContentRef}
        className={styles.popoverContent}
        id={uniqueId}
        popover="auto"
      >
        {content}
      </div>
    </div>
  );
};
