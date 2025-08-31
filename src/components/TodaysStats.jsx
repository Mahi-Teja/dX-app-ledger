import React from "react";
import { ArrowIcons } from "../utils/icons";

const TodaysStats = React.memo(function TodaysStas({
  statTitlel,
  stat = 0,
  icon,
  type,
}) {
  const cn =
    type === "expense"
      ? "bg-rose-200 text-rose-400"
      : type === "income"
      ? "bg-emerald-200 text-emerald-400"
      : type === "balance"
      ? "bg-indigo-200 text-indigo-400"
      : "";

  
  return (
    <section className="bg-indigo-200 flex justify-start mx-2 md:m-2 w-full p-3 text-sm lg:text-xl rounded-md   items-center">
      <div
        className={`col-span-2  p-2 rounded md:min-w-20 text-2xl lg:text-4xl  h-full flex justify-center items-center ${cn} `}
      >
        {icon}
      </div>
      <div className="col-span-1 px-2 justify-start">
        <div className="text-md text-gray-600">{statTitlel}</div>
        <div className="font-semibold text-2xl lg:text-4xl ">{stat}</div>
      </div>
    </section>
  );
});

export default TodaysStats;
