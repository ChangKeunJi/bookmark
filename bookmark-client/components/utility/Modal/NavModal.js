import PropTypes from "prop-types";

const NavModal = ({ text, emoji }) => {
  return (
    <p className="tracking-wider text-xs sm:text-base">
      {text}
      {"  "}
      <span role="img" aria-label="writing hand" className="ml-2">
        {emoji}
      </span>
    </p>
  );
};
export default NavModal;

NavModal.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
};
