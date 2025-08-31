import React, { useState, useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../utils/dates";
import { ArrowIcons } from "../utils/icons";

const DateNav = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const [currDate, setCurrDate] = useState(today);

  const formatDisplay = (date) => {
    return date.toDateString(); // e.g., "Mon May 20 2025"
  };

  const isToday = (date) => {
    const todayStr = today.toDateString();
    return date.toDateString() === todayStr;
  };

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
    <section className="grid md:flex grid-cols-8 justify-evenly items-center py-2 gap-3 bg-indigo-400 text-indigo-50 rounded shadow">
      <button
        className=" col-span-1 items-center"
        onClick={() => changeDateBy(-1)}
      >
        {ArrowIcons.leftAngle}
      </button>

      <button onClick={goToToday} className="font-semibold  col-span-2">
        {isToday(currDate) ? `Today` : formatDisplay(currDate)}
      </button>

      <button
        className=" self-center col-span-1"
        onClick={() => changeDateBy(1)}
      >
        {ArrowIcons.rightAngle}
      </button>

      <input
        type="date"
        className="border p-1 rounded col-span-4"
        value={currDate.toISOString().split("T")[0]}
        onChange={handleDateInputChange}
      />
    </section>
  );
};

export default DateNav;
