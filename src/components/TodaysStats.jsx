import React from "react";

const TodaysStats = React.memo(function TodaysStats({
  title,
  value = 0,
  icon,
  type,
  className,
}) {
  // Better variable name for clarity
  const typeStyles =
    type === "expense"
      ? "bg-rose-200 text-rose-500"
      : type === "income"
      ? "bg-emerald-200 text-emerald-500"
      : type === "balance"
      ? "bg-indigo-200 text-indigo-500"
      : "";

  return (
    <section
      className={`bg-indigo-100 flex justify-start mx-2 md:mx-2 w-full p-3 rounded-md items-center 
      ${
        type === "balance"
          ? " sm:col-span-2 col-span-6"
          : "sm:col-span-2 col-span-3 "
      }
      ${className}
      `}
    >
      {/* Icon wrapper */}
      <div
        className={`p-2 rounded min-w-14 md:min-w-20 h-full flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl ${typeStyles}`}
      >
        {icon}
      </div>

      {/* Title + Value */}
      <div className="px-2">
        <div className="text-xs sm:text-sm md:text-base text-gray-600">
          {title}
        </div>
        <div className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl">
          {value}
        </div>
      </div>
    </section>
  );
});

export default TodaysStats;
