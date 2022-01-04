const H1: React.FC<{text: string; styles?: string}> = ({text, styles}) => {
  return (
    <h1 className={`font-medium text-xl leading-8 text-stone-700 ${styles}`}>
      {text}
    </h1>
  );
};

export default H1;
