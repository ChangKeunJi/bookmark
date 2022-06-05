import PropTypes from "prop-types";

const Toggle = ({ opt1, opt2, onClick, open }) => {
  return (
    <div className="w-36 flex items-center my-2">
      <label htmlFor="toggle" className=" flex items-center cursor-pointer">
        <div className="relative" onClick={onClick}>
          <input type="checkbox" checked={open} className="sr-only" readOnly />
          <div className="block bg-light-nav border border-gray-dark2 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-orange w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <div className="w-16 ml-2">
        <p className="text-center">{open ? opt1 : opt2}</p>
      </div>
    </div>
  );
};

export default Toggle;

Toggle.propTypes = {
  opt1: PropTypes.string,
  opt2: PropTypes.string,
  onClick: PropTypes.func,
  open: PropTypes.bool,
};
