import Image from "next/image";

const Webflow: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/webflow.svg"
      width={119}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Webflow;
