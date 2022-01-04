const H1: React.FC<{text: string; styles?: string}> = ({text, styles}) => {
  return (
    <h1 className={`font-medium text-2xl leading-10 text-stone-700 ${styles}`}>
      {text}
    </h1>
  );
};

export default H1;
