import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import Toggle from "./Toggle";

const FilterToggle = ({ setSort, initialSort }) => {
  const [open, setOpen] = useState(initialSort);

  const onClickToggle = useCallback(() => {
    if (open) {
      setSort(false);
      setOpen(false);
      window.localStorage.setItem("sort", "false");
    } else {
      setSort(true);
      setOpen(true);
      window.localStorage.setItem("sort", "true");
    }
  }, [open]);

  return (
    <Toggle
      onClick={onClickToggle}
      open={open}
      opt1="최신순"
      opt2="오래된 순"
    />
  );
};

export default FilterToggle;

FilterToggle.propTypes = {
  setSort: PropTypes.func,
  initialSort: PropTypes.bool,
};
