export const CustomButton1 = ({
  variant = "default", // safe | danger | default
  handleClick = () => {},
  classList = "",
  children,
  label,
  type = "button",
  size = "md", // sm | md | lg
  icon, // optional icon JSX
  shape = "rounded", // rounded | pill
}) => {
  // Base styling
  const baseClasses = `font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 flex items-center justify-center gap-2`;

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  // Shape variants
  const shapeClasses = {
    rounded: "rounded-md",
    pill: "rounded-full",
  };

  // Variant color classes
  const variantClasses = {
    safe: "bg-blue-600 hover:bg-blue-500 focus:ring-blue-400 text-white",
    danger: "bg-red-600 hover:bg-red-500 focus:ring-red-400 text-white",
    default: "bg-gray-600 hover:bg-gray-500 focus:ring-gray-400 text-white",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${baseClasses} ${sizeClasses[size]} ${shapeClasses[shape]} ${
        variantClasses[variant]
      } ${classList}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children || label}
    </button>
  );
};
