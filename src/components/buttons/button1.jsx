 
export const Button1 = ({
  children,
  type,
  className = "",
  handleClick = () => {},
  title = "",
}) => {
  return (
    <button
      type={type}
      className={`bg-indigo-600 rounded p-2 m-2 cursor-pointer text-white font-semibold ${className}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      title={title}
    >
      {children}
    </button>
  );
};
export const SubmitButton = ({ children, title, type }) => {
  <button
    type={type}
    className={`bg-indigo-600 h-3 rounded p-2 m-2 cursor-pointer text-white font-semibold`}
    title={title}
  >
    {children}
  </button>;
};

export const CustomButton2 = ({
  onClickHandler,
  label,
  customClass,
  noFill = false,
}) => {
  return (
    <button
      onClick={(e) => onClickHandler(e)}
      className={`px-4 w-fit md:min-w-28 mx-1 py-2   text-sm font-semibold  rounded  transition-all duration-200 shadow-md
              ${
                noFill
                  ? " border-blue-600 border text-blue-600"
                  : " bg-blue-600 hover:bg-blue-700 text-white"
              }
              ${customClass}
              
              `}
    >
      {label}
    </button>
  );
};
