import Image from "next/image";

const Nextjs: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/nextjs.svg"
      width={50}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Nextjs;
