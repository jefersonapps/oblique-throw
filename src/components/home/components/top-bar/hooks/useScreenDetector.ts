import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState<number>(1920);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowSizeChange);
      handleWindowSizeChange();

      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop, width };
};
