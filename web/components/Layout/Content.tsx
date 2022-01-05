import React from "react";

const Content: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex flex-grow shadow-sm bg-stone-100 p-8 justify-center header-body-split-bg">
      <div className="max-w-7xl w-full bg-white shadow-sm border rounded-lg border-stone-200 z-10 p-4">
        {children}
      </div>
    </div>
  );
};

export default Content;
