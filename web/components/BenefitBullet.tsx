import {CheckCircleIcon} from "@heroicons/react/solid";

const BenefitBullet: React.FC<{
  benefit: string;
  colour?: string;
}> = ({benefit, colour = "green"}) => {
  return (
    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200">
      <div
        className={`p-2 bg-${colour}-100 flex items-center justify-center rounded-full`}
      >
        <CheckCircleIcon className={`w-4 h-4 text-${colour}-500`} />
      </div>
      <span className="text-slate-700">{benefit}</span>
    </div>
  );
};

export default BenefitBullet;
