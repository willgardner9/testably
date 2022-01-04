const ErrorMessage: React.FC<{text: string; styles?: string}> = ({
  text,
  styles,
}) => {
  return (
    <div
      className={`p-2 text-xs bg-red-50 border border-red-500 rounded text-red-500 text-center ${styles}`}
    >
      {text}
    </div>
  );
};

export default ErrorMessage;
