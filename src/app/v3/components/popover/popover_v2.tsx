/**
 * A flexible popover component with native API support and fallback implementation.
 *
 * @example
 * <Popover
 *   trigger={<Button>Open Menu</Button>}
 *   content={<div>Popover content</div>}
 *   offsetY={4}
 * />
 */
"use client";
import {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useId,
  useRef,
} from "react";
import { usePopoverPosition } from "../hooks/usePopoverPosition";
import { usePopoverEvents } from "../hooks/usePopoverEvents";
import { usePopoverSupport } from "@/app/v3/components/hooks/usePopoverSupport";
import { usePopoverState } from "../hooks/usePopoverState";
import styles from "./popover.module.css";

interface PopoverProps<T extends HTMLElement> {
  trigger: ReactElement<HTMLAttributes<T> & { ref?: Ref<T> }>;
  content: ReactNode;
  offsetY?: number;
}

export const Popover = <T extends HTMLElement>({
  trigger,
  content,
  offsetY = 2,
}: PopoverProps<T>): ReactElement => {
  const { supportsPopover } = usePopoverSupport();
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<T>(null);
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

  if (!isValidElement(trigger)) {
    throw new Error(
      'Popover: The "trigger" prop must be a valid React element',
    );
  }

  // Clone the trigger element and inject our props
  const enhancedTrigger = cloneElement(trigger, {
    ref: triggerRef,
    onClick: handleTriggerClick,
    "aria-expanded": isOpen,
    "aria-controls": uniqueId,
  });

  return (
    <div className={styles.popover}>
      {enhancedTrigger}
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
