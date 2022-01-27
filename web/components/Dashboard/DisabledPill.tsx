import {XIcon} from "@heroicons/react/solid";

const DisabledPill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-sm p-1 bg-red-200 text-red-700 rounded-md max-w-min hover:bg-red-300 hover:text-red-800 font-mono">
      <XIcon className="w-4 h-4 mr-1 text-red-700 opacity-75" />
      disabled
    </span>
  );
};

export default DisabledPill;
