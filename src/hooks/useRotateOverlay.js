import { useEffect, useState } from "react";

export default function useRotateOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setShow(isMobile && isPortrait);
   
    };

    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return show
 
}
