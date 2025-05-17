import React from "react";

const TodaysStats = ({ statTitlel, stat = 0 }) => {
  return (
    <section className="bg-white flex flex-col m-2 w-full p-3 text-sm lg:text-xl rounded-md justify-center items-center">
      <div className="">{statTitlel}</div>
      <div className="font-semibold text-xl lg:text-2xl ">{stat}</div>

      {}
    </section>
  );
};

export default TodaysStats;
