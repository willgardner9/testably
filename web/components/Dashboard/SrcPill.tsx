import {PhotographIcon} from "@heroicons/react/solid";

const SrcPill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-xxs p-1 bg-slate-200 text-slate-700 rounded-md max-w-min">
      <PhotographIcon className="w-4 h-4 mr-1 text-slate-400" />
      image/video
    </span>
  );
};

export default SrcPill;
