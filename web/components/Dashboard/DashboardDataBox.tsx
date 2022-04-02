const DashboardDataBox: React.FC<{
  label: string;
  value: number | string;
  outOfValue?: string;
  styles?: string;
  percentage?: boolean;
}> = ({label, value, outOfValue, styles, percentage = false}) => {
  return (
    <div
      className={`flex flex-col md:w-1/3 md:border-r last-of-type:border-r-0 ${styles}`}
    >
      <h3 className="uppercase text-xs text-slate-500 font-medium">{label}</h3>
      <div className="flex items-center justify-start gap-2 flex-col md:flex-row">
        {" "}
        <h2 className="text-2xl font-semibold text-slate-700 md:my-1">
          {percentage ? (Number(value) * 100).toFixed(2) : value}
        </h2>
        <h4 className="text-slate-400 text-xs ml-1">
          {percentage ? "%" : outOfValue}
        </h4>
      </div>
    </div>
  );
};

export default DashboardDataBox;
