import Image from "next/image";

const Shopify: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/shopify.svg"
      width={38}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Shopify;
