import Image from "next/image";

const Wordpress: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/wordpress.svg"
      width={131}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Wordpress;
