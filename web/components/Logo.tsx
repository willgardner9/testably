const Logo: React.FC<{fontSize: string; light?: boolean}> = ({
  fontSize,
  light,
}) => {
  return (
    <h1
      className={`font-oswald uppercase font-semibold select-none ${fontSize} ${
        light ? "text-stone-50" : "text-stone-700"
      } `}
    >
      testa/bly<span className="text-yellow-500">.</span>
    </h1>
  );
};

export default Logo;
