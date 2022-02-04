import Image from "next/image";

const Unbounce: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/unbounce.svg"
      width={152}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Unbounce;
