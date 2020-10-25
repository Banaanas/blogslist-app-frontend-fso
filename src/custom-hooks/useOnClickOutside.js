import { useEffect } from "react";

const useOnClickOutside = (DOMRef, handler) => {
  useEffect(() => {
    // Close Element if click outside the Ref - Callback Function
    const listener = (event) => {
      // Return if Click inside the Dom Ref or descendent elements
      if (!DOMRef.current || DOMRef.current.contains(event.target)) {
        return;
      }
      // Close Element if Click outside the Ref
      handler();
    };

    // Add the Event Listener - MouseDown instead of click for UX purpose
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Remove the Event Listener - useEffect Clean Up
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [DOMRef, handler]);
};

export default useOnClickOutside;
