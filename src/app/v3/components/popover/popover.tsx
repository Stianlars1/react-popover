"use client";
import {
  cloneElement,
  isValidElement,
  ReactElement,
  useId,
  useRef,
} from "react";
import { usePopoverPosition } from "../hooks/usePopoverPosition";
import { usePopoverEvents } from "../hooks/usePopoverEvents";
import { usePopoverSupport } from "@/app/v3/components/hooks/usePopoverSupport";
import { usePopoverState } from "../hooks/usePopoverState";
import { cx } from "@/app/v3/components/popover/utils/utils";
import styles from "./popover.module.css";
import { PopoverProps } from "@/app/v3/components/popover/types/types";

export const Popover = ({
  trigger,
  content,
  offsetY = 2,
  contentClassName,
}: PopoverProps): ReactElement => {
  const { supportsPopover } = usePopoverSupport();
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | SVGElement>(null);
  const uniqueId = useId();

  const { isOpen, handleToggle } = usePopoverState({
    contentRef,
    supportsPopover,
  });

  const { updatePosition } = usePopoverPosition<HTMLElement | SVGElement>(
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
  const handleTriggerClick = (e: MouseEvent) => {
    if (!contentRef.current) return;

    // Call the original onClick if it exists
    if (trigger.props.onClick) {
      trigger.props.onClick(e);
    }

    handleToggle();
    if (!isOpen) {
      updatePosition();
    }
  };

  if (!isValidElement(trigger)) {
    throw new Error("Popover trigger must be a valid React element");
  }

  const TriggerElement = cloneElement(trigger, {
    ref: triggerRef,
    "aria-expanded": isOpen,
    "aria-controls": uniqueId,
    "aria-haspopup": true,
    role: "button",
    tabIndex: 0,
    ...trigger.props,
    onClick: handleTriggerClick,
    className: cx(trigger.props.className),
  });

  return (
    <>
      {TriggerElement}
      <div
        ref={contentRef}
        style={{ position: "fixed", left: 0, top: 0 }}
        id={uniqueId}
        className={cx(
          contentClassName,
          styles.popoverContent,
          isOpen && !supportsPopover && styles.fallbackOpen,
        )}
        {...(supportsPopover ? { popover: "auto" } : {})}
      >
        {content}
      </div>
    </>
  );
};
