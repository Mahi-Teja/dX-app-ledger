import React, { useState, useRef, useEffect } from "react";
import { FreeIcons } from "../../utils/icons"; // You can use your icon set or replace
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { Pencil, Trash2 } from "lucide-react";
import { Dialoge } from "../Dialoge";

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
export const MenuOptions = ({
  editLable,
  deleteLable,
  onEdit,
  onDelete,
  customRef,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [isDelete, setIsDelete] = useState(false);

  if (isDelete) {
    return (
      <Dialoge
        title={"Are you sure ?"}
        description={
          "This action cannot be undone and the data will be lost permanently."
        }
        agreeLabel={"Delete"}
        disagreeLabel={"Cancel"}
        onAgree={onDelete}
        isDetele={true}
        onDisagree={() => setIsDelete(false)}
      />
    );
  }
  return (
    <section ref={customRef}>
      <button
        className="py-1 rounded hover:bg-gray-200 transition-colors"
        onClick={setIsMenuOpen}
      >
        <BsThreeDotsVertical className="w-5 h-5  text-gray-500" />
      </button>

      {isMenuOpen && (
        <div className="absolute top-5 right-0 mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600"
            onClick={() => {
              onEdit();
              setIsMenuOpen(false);
            }}
          >
            <span>
              <Pencil size={16} />
            </span>{" "}
            {deleteLable}
            {editLable ?? editLable}
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
            onClick={() => {
              setIsDelete(true);
              setIsMenuOpen(false);
            }}
          >
            <span>
              <Trash2 size={16} />
            </span>
            {deleteLable ?? deleteLable}
          </button>
        </div>
      )}
    </section>
  );
};

export default OptionsMenu;
