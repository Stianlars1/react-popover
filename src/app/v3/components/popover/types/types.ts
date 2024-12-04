// Handle any HTML element props
import {
  AllHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  SVGAttributes,
} from "react";

export type HTMLElementProps = AllHTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
};

// Props for SVG elements
export type SVGElementProps = SVGAttributes<SVGElement> & {
  ref?: Ref<SVGElement>;
};

// Combined element props
export type ElementProps = HTMLElementProps | SVGElementProps;

// Props that we'll add to any trigger element
export type PopoverTriggerProps = {
  onClick?: (e: React.MouseEvent) => void;
  "aria-expanded": boolean;
  "aria-controls": string;
  "aria-haspopup": boolean;
  role: string;
  ref: React.RefObject<HTMLElement | SVGElement>;
  tabIndex?: number;
};

// Custom component props
export interface CustomComponentProps {
  triggerProps?: PopoverTriggerProps;

  [key: string]: any;
}

export interface PopoverProps {
  trigger: ReactElement<ElementProps | CustomComponentProps>;
  content: ReactNode;
  offsetY?: number;
  contentClassName?: string;
}
