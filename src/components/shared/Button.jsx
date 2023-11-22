import PropTypes from "prop-types";

const Button = ({ children, icon, type = "button", className, ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={`${className} w-fit bg-secondary flex items-center gap-2 text-2xl rounded-md py-2 px-3`}
    >
      {children}
      <span className="group-hover:translate-x-1 transition-all">{icon}</span>
    </button>
  );
};
export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};
