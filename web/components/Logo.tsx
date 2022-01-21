import Image from "next/image";

const Logo: React.FC<{fontSize: string; light?: boolean}> = ({
  fontSize,
  light,
}) => {
  return (
    <div className="flex items-center py-1">
      <Image
        src="/test-tube-1.png"
        width={40}
        height={40}
        alt="Testably logo"
      />
      <h1
        className={`font-oswald uppercase font-semibold select-none ${fontSize} -mb-2 ml-1 ${
          light ? "text-slate-50" : "text-slate-900"
        } `}
      >
        testa/bly
      </h1>
    </div>
  );
};

export default Logo;
