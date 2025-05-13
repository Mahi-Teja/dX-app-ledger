import React, { useEffect } from "react";

export const Model = ({ children }) => {
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    // Cleanup: enable scroll again when modal unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed ">
      <div className="fixed top-0 left-0 w-full h-screen flex  bg-[#100e0e96] "></div>
      <div className="fixed top-1/2 left-1/2 w-auto h-auto -translate-[50%] rounded ">
        {children}
      </div>
    </div>
  );
};
