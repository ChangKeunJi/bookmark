import { useEffect } from "react";

export function useClose(setState, ref) {
  const handleHideDropdown = (e) => {
    if (e.key === "Escape") {
      setState(false);
    }
  };
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
}
