import Image from "next/image";

const Unicorn: React.FC<{}> = ({}) => {
  return (
    <div className="flex items-center gap-1 text-slate-400 select-none text-xs font-medium">
      <Image
        src="/logos/unicorn.svg"
        width={30}
        height={30}
        className="z-20 scale-75"
      />
      Unicorn platform
    </div>
  );
};

export default Unicorn;
