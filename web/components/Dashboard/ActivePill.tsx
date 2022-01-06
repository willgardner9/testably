import {CheckIcon} from "@heroicons/react/solid";

const ActivePill: React.FC<{}> = ({}) => {
  return (
    <span className="flex items-center text-xxs p-1 bg-green-200 text-green-700 rounded-md max-w-min">
      <CheckIcon className="w-4 h-4 mr-1 text-green-700 opacity-75" />
      active
    </span>
  );
};

export default ActivePill;
