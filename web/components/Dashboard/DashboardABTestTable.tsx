import {EyeOffIcon} from "@heroicons/react/solid";
import ActivePill from "./ActivePill";
import CopyPill from "./CopyPill";
import DisabledPill from "./DisabledPill";
import SrcPill from "./SrcPill";
import VisibilityPill from "./VisibilityPill";

const DashboardABTestTable: React.FC<{
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
              Name
            </th>
            <th
              scope="col"
              className="py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
            >
              Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((test: any) => {
            return (
              <tr key={test.name} className="hover:bg-slate-50 cursor-pointer">
                <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap">
                  {test.name}
                </td>
                <td className="py-4 pr-4 text-sm text-slate-700 whitespace-nowrap">
                  {test.type == "copy" && <CopyPill />}
                  {test.type == "visiblity" && <VisibilityPill />}
                  {test.type == "src" && <SrcPill />}
                </td>
                <td className="py-4 pr-4 text-sm text-slate-700 whitespace-nowrap">
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

export default DashboardABTestTable;
