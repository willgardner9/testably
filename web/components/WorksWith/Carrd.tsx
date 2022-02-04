import Image from "next/image";

const Carrd: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/carrd.svg"
      width={30}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Carrd;
