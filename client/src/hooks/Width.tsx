import {useEffect, useState} from "react";

/**
 * Hook that subscribes to window resize events and updates internal
 * state accordingly. Subscribing to this hook will trigger a re-render
 * when the screen size changes and values depending upon the width field
 * observe.
 */
export function useScreenWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return width;
}