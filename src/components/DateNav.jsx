import React, { useState } from "react";
import { ArrowIcons } from "../utils/icons";

const DateNav = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const [currDate, setCurrDate] = useState(today);

  const formatDisplay = (date) => date.toDateString();
  const isToday = (date) => date.toDateString() === today.toDateString();

  const changeDateBy = (offset) => {
    const newDate = new Date(currDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrDate(newDate);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setCurrDate(today);
    setSelectedDate(today);
  };

  const handleDateInputChange = (e) => {
    const newDate = new Date(e.target.value);
    setCurrDate(newDate);
    setSelectedDate(newDate);
  };

  return (
    <section className="flex items-center justify-between gap-2  mt-2 bg-white shadow rounded-xl p-3">
      {/* Left side: arrows + current date */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => changeDateBy(-1)}
          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
        >
          {ArrowIcons.leftAngle}
        </button>

        <button
          onClick={goToToday}
          className="md:px-3 py-1 rounded-lg font-medium text-indigo-700 hover:bg-indigo-100 transition"
        >
          {isToday(currDate) ? "Today" : formatDisplay(currDate)}
        </button>

        <button
          onClick={() => changeDateBy(1)}
          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
        >
          {ArrowIcons.rightAngle}
        </button>
      </div>

      {/* Right side: date picker */}
      <input
        className="border border-indigo-200 rounded-lg px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        type="date"
        value={currDate.toISOString().split("T")[0]}
        onChange={handleDateInputChange}
      />
    </section>
  );
};

export default DateNav;
