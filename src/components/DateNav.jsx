import React, { useState, useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../utils/dates";

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
    <section className="flex justify-evenly items-center py-2 gap-3 bg-indigo-400 text-indigo-50 rounded shadow">
      <button onClick={() => changeDateBy(-1)}>{"<<"}</button>

      <button onClick={goToToday} className="font-semibold">
        {isToday(currDate) ? "Today" : formatDisplay(currDate)}
      </button>

      <button onClick={() => changeDateBy(1)}>{">>"}</button>

      <input
        type="date"
        className="border p-1 rounded"
        value={currDate.toISOString().split("T")[0]}
        onChange={handleDateInputChange}
      />
    </section>
  );
};

export default DateNav;
