import {EyeOffIcon} from "@heroicons/react/solid";

const VisibilityPill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-xs p-1 bg-slate-200 text-slate-700 rounded-md max-w-min">
      <EyeOffIcon className="w-3 h-3 mr-1 text-slate-400" />
      visibility
    </span>
  );
};

export default VisibilityPill;
