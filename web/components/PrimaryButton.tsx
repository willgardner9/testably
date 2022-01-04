const PrimaryButton: React.FC<{
  text: string;
  styles?: string;
  loading: boolean;
}> = ({text, styles, loading}) => {
  return (
    <button
      className={`bg-stone-700 p-2 rounded shadow-sm text-white border border-stone-800 hover:bg-stone-600 hover:border-stone-700 focus:outline-yellow-400 transition-all text-sm flex items-center justify-center ${styles}`}
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

export default PrimaryButton;
