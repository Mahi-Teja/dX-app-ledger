import React from "react";
import { CustomButton1 } from "./buttons/CustomButton1";
import { Model } from "./utils/Model";

export const Dialoge = ({
  title,
  description,
  onAgree,
  onDisagree,
  agreeLabel,
  disagreeLabel,
  isDetele = false,
}) => {
  return (
    <Model>
      <section className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <section className="text-center  ">
          <div className="text-lg font-semibold text-gray-800">{title}</div>
          {description && (
            <div className="mt-2 text-sm text-gray-500">{description}</div>
          )}
        </section>

        {/* Actions */}
        <section className="flex justify-center items-center gap-3 mt-6">
          <CustomButton1
            label={disagreeLabel}
            handleClick={onDisagree}
            variant={isDetele ? "safe" : "danger"}
          />
          <CustomButton1
            label={agreeLabel}
            handleClick={onAgree}
            variant={!isDetele ? "safe" : "danger"}
          />
        </section>
      </section>
    </Model>
  );
};
