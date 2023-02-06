import {useEffect, useState} from "react";

export interface IScalable {
  isSmallDevice: boolean;
}

/**
 * Hook that subscribes to window resize events and updates internal
 * state accordingly.
 */
export function useDimensions() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return {width, height};
}