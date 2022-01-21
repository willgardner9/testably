import React from "react";

const Content: React.FC<{children: React.ReactNode; width?: string}> = ({
  children,
  width = "max-w-7xl",
}) => {
  return (
    <div className="flex flex-grow shadow-sm bg-white p-8 justify-center header-body-split-bg">
      <div
        className={`w-full h-min bg-white shadow-sm border rounded-lg border-slate-200 z-10 p-4 ${width}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Content;
