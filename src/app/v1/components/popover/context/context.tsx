import { createContext, useContext } from "react";

interface PopoverContextValue {
  id: string;
}

export const PopoverContext = createContext<PopoverContextValue | undefined>(
  undefined,
);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within <Popover />");
  }
  return context;
};
