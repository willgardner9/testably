import React from "react";

const Placeholder: React.FC<{children: React.ReactNode; ping?: boolean}> = ({
  children,
  ping,
}) => {
  return (
    <div className="relative border-2 border-dashed border-slate-200 shadow-sm mb-4 px-2 py-8 rounded-md text-center text-slate-500 text-sm">
      {ping && (
        <div className="flex absolute -top-2 -right-2 h-3 w-3 bg-green-500 border border-green-600 rounded-full">
          <span className="-top-2 -right-2 w-full bg-green-300 rounded-full animate-ping"></span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Placeholder;
