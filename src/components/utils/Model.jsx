import React, { useEffect } from "react";

export const Model = ({ children, setState = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setState(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-transparent rounded-xl   p-6 w-[90vw] max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};
