import React, { useEffect } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (handler: (event: Event) => void) => {
  const containerRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = containerRef?.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return containerRef;
};

export default useOnClickOutside;
