import Image from "next/image";

const Logo: React.FC<{
  fontSize?: string;
  logoSize?: number;
  gap?: string;
}> = ({fontSize = "text-2xl", logoSize = 50, gap = "gap-0"}) => {
  return (
    <div className={`flex items-center ${gap}`}>
      <Image src="/logo.png" height={logoSize} width={logoSize} />
      <h1
        className={`font-oswald uppercase font-semibold select-none text-slate-900 ${fontSize}`}
      >
        TESTA/BLY
      </h1>
    </div>
  );
};

export default Logo;
