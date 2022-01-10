const DangerButton: React.FC<{
  text: string;
  styles?: string;
  loading: boolean;
  handleOnClick?: () => void;
  isPrimary?: boolean;
}> = ({text, styles, loading, handleOnClick, isPrimary}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`p-2 rounded shadow-sm border focus:outline-pink-400 transition-all text-sm flex items-center justify-center ${styles} ${
        isPrimary
          ? "bg-red-500 hover:bg-red-600 border-red-700 hover:border-red-8x00 text-white"
          : "text-red-500 bg-red-50 hover:bg-red-100 border-red-300 hover:border-red-400 hover:text-red-600"
      }`}
    >
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
        text
      )}
    </button>
  );
};

export default DangerButton;
