import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { isPopoverTrigger } from "@/app/v2/components/popoverTrigger/popoverTrigger";
import { isPopoverContent } from "@/app/v2/components/popoverContent/popoverContent";
import styles from "./popover.module.css";

interface PopoverProps {
  children: ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });

  const toggle = () => setIsOpen((prev) => !prev);
  const closePopover = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      closePopover();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closePopover();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: triggerRect.bottom + window.scrollY,
          right: triggerRect.left + triggerRect.width,
        });
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Clone children to pass down props
  const clonedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (isPopoverTrigger(child)) {
      return cloneElement(child, {
        isOpen,
        toggle,
        triggerRef,
      });
    }

    if (isPopoverContent(child)) {
      return cloneElement(child, {
        isOpen,
        popoverRef,
        closePopover,
        position,
      });
    }

    return child;
  });

  return <div className={styles.popover}>{clonedChildren}</div>;
};
Popover.displayName = "Popover";

export { Popover };
