import Image from "next/image";

const Squarespace: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/squarespace.svg"
      width={38}
      height={30}
      className="z-20"
    />
  );
};

export default Squarespace;
