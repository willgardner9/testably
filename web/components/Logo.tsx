const Logo: React.FC<{fontSize: string; light?: boolean}> = ({
  fontSize,
  light,
}) => {
  return (
    <h1
      className={`font-oswald uppercase font-semibold select-none ${fontSize} ${
        light ? "text-slate-50" : "text-slate-700"
      } `}
    >
      testa/bly
      <span className={`${light ? "text-pink-300" : "text-pink-500"}`}>.</span>
    </h1>
  );
};

export default Logo;
