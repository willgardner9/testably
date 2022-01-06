const DashboardDataBox: React.FC<{
  label: string;
  value: string;
  outOfValue?: string;
  styles?: string;
}> = ({label, value, outOfValue, styles}) => {
  return (
    <div
      className={`flex flex-col w-full md:w-1/3 border border-slate-200 rounded-md p-4 ${styles}`}
    >
      <h3 className="uppercase text-xs text-slate-500 font-medium">{label}</h3>
      <h2 className="text-3xl text-center md:my-4">{value}</h2>
      <h4 className="text-slate-400 text-xs ml-1 text-right">{outOfValue}</h4>
    </div>
  );
};

export default DashboardDataBox;
