import { useEffect, useState } from "react";

export const usePopoverSupport = () => {
  const [supportsPopover, setSupportsPopover] = useState(false);
  useEffect(() => {
    setSupportsPopover(HTMLElement.prototype.hasOwnProperty("popover"));
  }, []);

  return { supportsPopover };
};
