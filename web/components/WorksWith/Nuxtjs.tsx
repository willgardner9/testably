import Image from "next/image";

const Nuxtjs: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/nuxt.svg"
      width={162}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Nuxtjs;
