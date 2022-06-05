import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import Toggle from "./Toggle";

const DarkmodeToggle = () => {
  const { theme, setTheme } = useTheme();
  let initialValue = true;
  if (theme === "dark") initialValue = false;
  const [open, setOpen] = useState(initialValue);

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation();
      if (open) {
        setTheme("dark");
        setOpen(false);
      } else {
        setTheme("light");
        setOpen(true);
      }
    },
    [open, theme],
  );

  return (
    <Toggle opt1="라이트" opt2="다크" open={open} onClick={onClickToggle} />
  );
};

export default DarkmodeToggle;
