import Image from "next/image";

const Unicorn: React.FC<{}> = ({}) => {
  return (
    <div className="flex items-center gap-2 text-slate-400 select-none text-sm font-medium">
      <Image src="/logos/unicorn.svg" width={30} height={30} className="z-20" />
      Unicorn platform
    </div>
  );
};

export default Unicorn;
