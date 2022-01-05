import React from "react";

const Container: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">{children}</div>
  );
};

export default Container;
