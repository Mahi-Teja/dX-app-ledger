import React, { useState, useRef, useEffect } from "react";
import { FreeIcons } from "../utils/icons"; // You can use your icon set or replace

const OptionsMenu = ({ onEdit, onDelete, onMore }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-600 hover:text-gray-800 p-2 rounded-full transition"
      >
        {FreeIcons.menu || "⋮"}
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-sm">
            <button
              onClick={() => {
                onEdit?.();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => {
                onMore?.();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ➕ More Options
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
