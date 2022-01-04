const Logo: React.FC<{fontSize: string}> = ({fontSize}) => {
  return (
    <h1
      className={`font-oswald uppercase font-semibold select-none text-stone-800 ${fontSize} `}
    >
      testa/bly<span className="text-yellow-500">.</span>
    </h1>
  );
};

export default Logo;
