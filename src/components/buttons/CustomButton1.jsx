export const CustomButton1 = ({
  variant,
  handleClick = () => {},
  classList,
  children,
}) => {
  return (
    <button
      onClick={(e) => handleClick(e)}
      className={` text-white px-4 py-2 m-1 w-full rounded cursor-pointer ${
        variant === "safe"
          ? "bg-blue-600 hover:bg-blue-500"
          : variant === "danger"
          ? "bg-red-600 hover:bg-red-500"
          : "bg-gray-600 hover:bg-gray-500"
      }
} ${classList}`}
    >
      {children}
    </button>
  );
};
