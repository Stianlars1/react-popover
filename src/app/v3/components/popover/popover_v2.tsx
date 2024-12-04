"use client";
import { ReactElement, useId, useRef } from "react";
import { usePopoverPosition } from "../hooks/usePopoverPosition";
import { usePopoverEvents } from "../hooks/usePopoverEvents";
import { usePopoverSupport } from "@/app/v3/components/hooks/usePopoverSupport";
import { usePopoverState } from "../hooks/usePopoverState";
import styles from "./popover.module.css";
import { PopoverProps } from "@/app/v3/components/popover/types/popoverTypes";

export const Popover = ({
  triggerTitle,
  content,
  offsetY = 2,
}: PopoverProps): ReactElement => {
  const { supportsPopover } = usePopoverSupport();
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uniqueId = useId();

  const { isOpen, handleToggle } = usePopoverState({
    contentRef,
    supportsPopover,
  });

  const { updatePosition } = usePopoverPosition(
    { triggerRef, contentRef },
    isOpen,
    offsetY,
  );

  usePopoverEvents({
    isOpen,
    setIsOpen: () => handleToggle(),
    triggerRef,
    contentRef,
    supportsPopover,
  });

  const handleTriggerClick = () => {
    if (!contentRef.current) return;

    handleToggle();

    if (!isOpen) {
      requestAnimationFrame(updatePosition);
    }
  };

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
        ref={contentRef}
        className={`${styles.popoverContent} ${
          isOpen && !supportsPopover ? styles.fallbackOpen : ""
        }`}
        id={uniqueId}
        {...(supportsPopover ? { popover: "auto" } : {})}
      >
        {content}
      </div>
    </div>
  );
};
