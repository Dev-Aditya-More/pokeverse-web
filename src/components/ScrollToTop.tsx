import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Links like "/#features" should land on the section. Pages load lazily, so the
    // target may not exist yet — keep looking for up to ~2s before giving up.
    let frame = 0;
    let tries = 0;
    const find = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 120) frame = requestAnimationFrame(find);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
