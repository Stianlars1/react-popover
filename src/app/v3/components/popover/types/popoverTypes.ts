import { ReactNode } from "react";

export interface PopoverProps {
  triggerTitle: string;
  content: ReactNode;
  offsetY?: number;
}
