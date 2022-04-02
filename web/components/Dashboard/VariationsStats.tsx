import {TrendingDownIcon, TrendingUpIcon} from "@heroicons/react/solid";
import Logo from "../Logo";

const {jStat} = require("jstat");

const VariationsStats: React.FC<{
  data: any;
}> = ({data}) => {
  const conversionRates: number[] = [];
  data.forEach((variation: any) =>
    conversionRates.push(variation.conversions_count / variation.sessions_count)
  );
  const standardErrorA = Math.sqrt(
    (conversionRates[0] * (1 - conversionRates[0])) / data[0]["sessions_count"]
  );
  const standardErrorB = Math.sqrt(
    (conversionRates[1] * (1 - conversionRates[1])) / data[1]["sessions_count"]
  );
  const standardErrorOfDifference = Math.sqrt(
    Math.pow(standardErrorA, 2) + Math.pow(standardErrorB, 2)
  );
  const zScore =
    (conversionRates[0] - conversionRates[1]) / standardErrorOfDifference;
  const pValue = jStat.ztest(zScore, 2);
  const uplift = (
    ((conversionRates[1] - conversionRates[0]) / conversionRates[0]) *
    100
  ).toFixed(2);
  const pValuePercent = (pValue * 100).toFixed(2);
  return isNaN(pValue) ? (
    <div className="flex flex-col bg-slate-900 p-4 rounded-md items-center text-slate-300 text-sm font-light leading-7 items-start">
      <div className="flex w-full items-center gap-1 mb-2">
        <Logo fontSize="md" logoSize={25} />
        <p className="font-oswald text-white uppercase">says...</p>
      </div>
      <div className="flex gap-2 items-center w-full">
        <div className="p-2 items-center justify-between bg-slate-800 rounded-md">
          <TrendingUpIcon className="w-4 h-4 text-slate-400" />
        </div>
        <div className="text-md font-medium text-slate-100 uppercase tracking-wider min-w-max">
          Not enough data to calculate statistical significance
        </div>
      </div>
      <div className="mt-2 flex w-full">
        You need some sessions and conversions to be able to assess the
        statistical signifiance of your A/B test.
      </div>
    </div>
  ) : pValue > 0.05 ? (
    <div className="flex flex-col bg-slate-900 p-4 rounded-md items-center text-slate-300 text-sm font-light leading-7 items-start">
      <div className="flex w-full items-center gap-1 mb-2">
        <Logo fontSize="md" logoSize={25} />
        <p className="font-oswald text-white uppercase">says...</p>
      </div>
      <div className="flex gap-2 items-center w-full">
        <div className="p-2 items-center justify-between bg-orange-900 rounded-md">
          <TrendingDownIcon className="w-4 h-4 text-orange-500" />
        </div>
        <div className="text-md font-medium text-slate-100 uppercase tracking-wider min-w-max">
          This test is not statistically significant
        </div>
      </div>
      <div className="mt-2">
        The conversion rate for{" "}
        <span>
          '{data[1]["value"]}'{" "}
          <span className="font-mono font-base">
            {"(" + (conversionRates[1] * 100).toFixed(2) + "%)"}
          </span>
        </span>{" "}
        was <span className="font-mono font-base">{uplift + "%"}</span>{" "}
        {Number(uplift) > 1 ? "higher" : "lower"} than the conversion rate for{" "}
        <span>
          '{data[0]["value"]}'
          <span className="font-mono font-base">
            {" (" + (conversionRates[0] * 100).toFixed(2) + "%)"}
          </span>
        </span>
        . We are only{" "}
        <span className="bg-orange-900 text-orange-500 rounded-md p-1 font-mono font-base">
          {(100 - Number(pValuePercent)).toFixed(2) + "%"}
        </span>{" "}
        confident that this change in CVR is the result of your changes. Either
        there is no real difference in performance between A and B or you need
        to collect more data.
      </div>
    </div>
  ) : (
    <div className="flex flex-col bg-slate-900 p-4 rounded-md items-center text-slate-300 text-sm font-light leading-7 items-start">
      <div className="flex w-full items-center gap-1 mb-2">
        <Logo fontSize="md" logoSize={25} />
        <p className="font-oswald text-white uppercase">says...</p>
      </div>
      <div className="flex gap-2 items-center w-full">
        <div className="p-2 items-center justify-between bg-green-900 rounded-md">
          <TrendingUpIcon className="w-4 h-4 text-green-500" />
        </div>
        <div className="text-md font-medium text-slate-100 uppercase tracking-wider min-w-max">
          This test is statistically significant
        </div>
      </div>
      <div className="mt-2">
        The conversion rate for{" "}
        <span>
          '{data[1]["value"]}'{" "}
          <span className="font-mono font-base">
            {"(" + (conversionRates[1] * 100).toFixed(2) + "%)"}
          </span>
        </span>{" "}
        was <span className="font-mono font-base">{uplift + "%"}</span>{" "}
        {Number(uplift) > 1 ? "higher" : "lower"} than the conversion rate for{" "}
        <span>
          '{data[0]["value"]}'
          <span className="font-mono font-base">
            {" (" + (conversionRates[0] * 100).toFixed(2) + "%)"}
          </span>
        </span>
        . We are{" "}
        <span className="bg-green-900 text-green-500 rounded-md p-1 font-mono font-base">
          {(100 - Number(pValuePercent)).toFixed(2) + "%"}
        </span>{" "}
        confident that this change in CVR is the result of your changes.
      </div>
    </div>
  );
};

export default VariationsStats;
