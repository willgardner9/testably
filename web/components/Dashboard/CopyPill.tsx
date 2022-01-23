import {TranslateIcon} from "@heroicons/react/solid";

const CopyPill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-sm p-1 bg-slate-200 text-slate-700 rounded-md max-w-min">
      <TranslateIcon className="w-4 h-4 mr-1 text-slate-400" />
      text
    </span>
  );
};

export default CopyPill;
