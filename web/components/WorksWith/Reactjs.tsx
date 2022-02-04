import Image from "next/image";

const Reactjs: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/react.svg"
      width={34}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Reactjs;
