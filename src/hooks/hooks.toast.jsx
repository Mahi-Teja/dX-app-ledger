import { useEffect, useState } from "react";
import { FreeIcons } from "../utils/icons";

export const useToast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const time = 5000; //ms
  useEffect(() => {
    setIsOpen(true);
    const t = setTimeout(() => {
      setIsOpen(false);
    }, time);

    return () => {
      clearTimeout(t);
      setTitle("");
      setDescription("");
      setType(null);
      setIsOpen(false);
    };
  }, []);
  useEffect(() => {
    setIsOpen(true);
    const t = setTimeout(() => {
      setIsOpen(false);
    }, time);

    return () => {
      clearTimeout(t);
      setTitle("");
      setDescription("");
      setType(null);
      setIsOpen(false);
    };
  }, [isOpen]);
  const Toast = () => {
    return (
      isOpen && (
        <div
          className={`absolute z-90 transition-all  flex items-center gap-2 bg-white rounded p-2 w-50 shadow-2xs right-2.5 bottom-3.5`}
        >
          <div className="p-2">{FreeIcons.addCategory}</div>
          <div className="">
            <div className="">Title</div>
            <div className="">description</div>
          </div>
        </div>
      )
    );
  };
  const setToast = (title = "", description = "", type = "") => {
    setTitle(title);
    setDescription(description);
    setType(type);
    setIsOpen(true);
  };

  return [Toast, setToast];
};
