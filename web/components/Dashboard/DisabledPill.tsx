import {XIcon} from "@heroicons/react/solid";

const DisabledPill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-xxs p-1 bg-red-200 text-red-700 rounded-md max-w-min">
      <XIcon className="w-4 h-4 mr-1 text-red-700 opacity-75" />
      disabled
    </span>
  );
};

export default DisabledPill;
