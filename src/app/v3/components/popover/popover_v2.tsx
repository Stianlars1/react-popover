"use client";
import { isValidElement, ReactElement, ReactNode, useId, useRef } from "react";
import { usePopoverPosition } from "../hooks/usePopoverPosition";
import { usePopoverEvents } from "../hooks/usePopoverEvents";
import { usePopoverSupport } from "@/app/v3/components/hooks/usePopoverSupport";
import { usePopoverState } from "../hooks/usePopoverState";
import { cx } from "@/app/v3/components/popover/utils/utils";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  offsetY?: number;
  className?: string;
}

export const Popover = ({
  trigger,
  content,
  offsetY = 2,
  className,
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

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!contentRef.current) return;

    // Call original onClick if the trigger is a button
    if (isValidElement(trigger) && trigger.type === "button") {
      trigger.props.onClick?.(e);
    }

    handleToggle();
    if (!isOpen) {
      updatePosition();
    }
  };

  // Extract button props if trigger is a button element
  const buttonProps =
    isValidElement(trigger) && trigger.type === "button"
      ? {
          ...trigger.props,
          className: cx(className, trigger.props.className),
          "aria-label": trigger.props["aria-label"],
          tabIndex: trigger.props.tabIndex,
          // Don't copy onClick as we handle it separately
          onClick: undefined,
          // Don't copy ref as we use our own
          ref: undefined,
        }
      : {
          className,
        };

  // If trigger is a button, render its children instead
  const triggerContent =
    isValidElement(trigger) && trigger.type === "button"
      ? trigger.props.children
      : trigger;

  return (
    <>
      <button
        {...buttonProps}
        ref={triggerRef}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-controls={uniqueId}
        type="button"
      >
        {triggerContent}
      </button>
      <div
        ref={contentRef}
        style={{ position: "fixed", left: 0, top: 0 }}
        id={uniqueId}
        {...(supportsPopover ? { popover: "auto" } : {})}
      >
        {content}
      </div>
    </>
  );
};
