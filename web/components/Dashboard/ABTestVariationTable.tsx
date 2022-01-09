import Link from "next/link";
import {ITest} from "../../types/ITest";
import ActivePill from "./ActivePill";
import CopyPill from "./CopyPill";
import DisabledPill from "./DisabledPill";
import SrcPill from "./SrcPill";
import VisibilityPill from "./VisibilityPill";

const ABTestVariationTable: React.FC<{
  data: any;
}> = ({data}) => {
  return (
    <div className="overflow-x-scroll">
      <table className="w-full divide-y divide-slate-100 rounded">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Value
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Sessions
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Conversions
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              CVR
            </th>
            <th
              scope="col"
              className="py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length &&
            data.map((test: any) => {
              return (
                <tr className="hover:bg-slate-50 cursor-pointer">
                  <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap">
                    {test.value}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {test.sessions}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {test.conversions}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {((test.conversions / test.sessions) * 100).toFixed(2) +
                      `%`}
                  </td>
                  <td className="py-4 pl-4 text-sm text-slate-700 whitespace-nowrap flex justify-end">
                    {test.active ? <ActivePill /> : <DisabledPill />}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ABTestVariationTable;
