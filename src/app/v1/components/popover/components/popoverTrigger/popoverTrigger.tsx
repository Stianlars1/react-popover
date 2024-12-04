"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePopover } from "../../context/context";
import { cx } from "@/app/v1/components/popover/utils/utils";
import styles from "./popoverTrigger.module.css";

export type PopoverPosition = "left" | "right" | "top" | "bottom" | "center";

interface PopoverTriggerProps {
  children: ReactNode;
  className?: string;
  position?: PopoverPosition;
  offset?: number;
}

export function PopoverTrigger({
  children,
  offset = 8,
  position = "center",
  className,
}: PopoverTriggerProps) {
  const { id } = usePopover();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculatePosition = useCallback(
    (
      triggerRect: DOMRect,
      popoverWidth: number,
      popoverHeight: number,
      scrollX: number,
    ) => {
      switch (position) {
        case "left":
          return {
            top: triggerRect.top + triggerRect.height / 2 - popoverHeight / 2,
            left: triggerRect.left + scrollX - popoverWidth - offset,
          };
        case "right":
          return {
            top: triggerRect.top + triggerRect.height / 2 - popoverHeight / 2,
            left: triggerRect.right + scrollX + offset,
          };
        case "top":
          return {
            top: triggerRect.top - popoverHeight - offset,
            left:
              triggerRect.left +
              scrollX +
              triggerRect.width / 2 -
              popoverWidth / 2,
          };
        case "bottom":
          return {
            top: triggerRect.bottom + offset,
            left:
              triggerRect.left +
              scrollX +
              triggerRect.width / 2 -
              popoverWidth / 2,
          };
        case "center":
        default:
          return {
            top: triggerRect.bottom + offset,
            left: triggerRect.right + scrollX - popoverWidth,
          };
      }
    },
    [position, offset],
  );

  const updatePosition = useCallback(() => {
    if (!isMounted) return;

    const trigger = triggerRef.current;
    const popover = document.getElementById(id);

    if (trigger && popover) {
      const rect = trigger.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const viewportWidth = window.innerWidth;
      const VIEWPORT_MARGIN = 16;

      // Calculate available space on both sides
      const availableSpaceLeft = rect.left - VIEWPORT_MARGIN;
      const availableSpaceRight = viewportWidth - rect.right - VIEWPORT_MARGIN;

      // Get original dimensions
      const originalWidth = popover.offsetWidth;
      const popoverHeight = popover.offsetHeight;

      // Set maximum width based on available space
      const maxWidth = Math.min(
        originalWidth, // Original width
        viewportWidth - VIEWPORT_MARGIN * 2, // Maximum possible width
      );

      // Set the max-width before calculating position
      popover.style.setProperty("--popover-max-width", `${maxWidth}px`);

      let { top, left } = calculatePosition(
        rect,
        maxWidth, // Use new width for position calculation
        popoverHeight,
        scrollX,
      );

      // Ensure left position stays within bounds
      if (left < VIEWPORT_MARGIN) {
        left = VIEWPORT_MARGIN;
      }
      if (left + maxWidth > viewportWidth - VIEWPORT_MARGIN) {
        left = viewportWidth - maxWidth - VIEWPORT_MARGIN;
      }

      requestAnimationFrame(() => {
        popover.style.setProperty("--popover-top", `${top}px`);
        popover.style.setProperty("--popover-left", `${left}px`);

        if (!isInitialized) {
          setIsInitialized(true);
        }
      });
    }
  }, [id, isInitialized, isMounted, calculatePosition]);

  useEffect(() => {
    if (!isMounted) return;

    const trigger = triggerRef.current;
    const popover = document.getElementById(id);

    if (trigger && popover) {
      // Initial position update
      const timeoutId = setTimeout(updatePosition, 0);

      // Create observers only after mount
      const resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(popover);

      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "popover"
          ) {
            updatePosition();
          }
        });
      });

      mutationObserver.observe(popover, { attributes: true });

      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [id, updatePosition, isMounted]);

  const handleTriggerClick = () => {
    updatePosition();
    // here you could toggle it manually
    // const popover = document.getElementById(id);
    // if (popover && popover.togglePopover())
  };
  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: triggerRef,
        "aria-haspopup": "dialog",
        popoverTarget: id, // this opens and closes by native
        className: cx(className, styles.popoverTrigger),
        onClick: handleTriggerClick,
      })}
    </>
  );
}
