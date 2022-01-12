import React from "react";

const SecondaryButton: React.FC<{
  text: string;
  styles?: string;
  loading: boolean;
  handleOnClick?: () => void;
  icon?: React.ReactNode;
  ping?: boolean;
}> = ({text, styles, loading, handleOnClick, icon, ping}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`bg-white p-2 rounded shadow-sm text-slate-400 border border-slate-300 hover:border-slate-400 hover:text-slate-500 focus:outline-pink-400 transition-all text-sm flex items-center justify-center ${styles} ${
        ping ? "relative" : ""
      }`}
    >
      {ping && (
        <div className="flex absolute -top-2 -right-2 h-4 w-4 bg-pink-400 border border-pink-600 rounded-full">
          <span className="-top-2 -right-2 w-full bg-pink-300 rounded-full animate-ping"></span>
        </div>
      )}
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <div className="hidden">{text}</div>
        </>
      ) : (
        <>
          {icon}
          <span className="text-slate-500 hover:text-slate-600">{text}</span>
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
