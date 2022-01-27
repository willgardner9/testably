const H2: React.FC<{text: string; styles?: string}> = ({text, styles}) => {
  return (
    <h1 className={`font-medium text-xl leading-10 text-slate-700 ${styles}`}>
      {text}
    </h1>
  );
};

export default H2;
