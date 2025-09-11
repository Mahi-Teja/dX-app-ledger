
const ScrollLayout = ({
  headerContent,
  children,
  className = "",
  bodyPaddingBottom = "pb-3", // default 3px bottom gap
  height = "h-[calc(100vh-64px)]", // default: full viewport minus header/nav
}) => {
  return (
    <div className={`flex flex-col ${height} ${className}`}>
      {/* Header (fixed) */}
      <div className="flex-shrink-0">{headerContent}</div>

      {/* Body (scrollable) */}
      <div className={`flex-1 overflow-auto ${bodyPaddingBottom}`}>
        {children}
      </div>
    </div>
  );
};

export default ScrollLayout;
