import Image from "next/image";

const Vue: React.FC<{}> = ({}) => {
  return (
    <Image
      src="/logos/vue.svg"
      width={35}
      height={30}
      className="z-20 scale-75"
    />
  );
};

export default Vue;
