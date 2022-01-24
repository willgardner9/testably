import Link from "next/link";
import {ITest} from "../../types/ITest";
import ActivePill from "./ActivePill";
import CopyPill from "./CopyPill";
import DisabledPill from "./DisabledPill";
import SrcPill from "./SrcPill";
import VisibilityPill from "./VisibilityPill";

const DashboardABTestTable: React.FC<{
  data: ITest[];
}> = ({data}) => {
  return (
    <>
      {data.length ? (
        <div className="overflow-x-scroll">
          <table className="w-full divide-y divide-slate-100 rounded table-auto">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3 pr-3 md:pr-0 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 pr-3 md:pr-0 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Test&#160;page&#160;URL
                </th>
                <th
                  scope="col"
                  className="py-3 pr-3 md:pr-0 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Conversion&#160;URL
                </th>
                <th
                  scope="col"
                  className="py-3 pr-3 md:pr-0 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Type
                </th>

                <th
                  scope="col"
                  className="py-3 pr-3 md:pr-0 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.length &&
                data.map((test: ITest) => {
                  return (
                    <Link key={test.id} href={`dashboard/abtests/${test.id}`}>
                      <tr className="hover:bg-slate-50 cursor-pointer">
                        <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap">
                          {test.name}
                        </td>
                        <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                          <span className="flex items-center text-sm font-mono p-1 bg-slate-200 text-slate-700 rounded-md w-fit border">
                            {test.test_page}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                          <span className="flex items-center text-sm font-mono p-1 bg-slate-200 text-slate-700 rounded-md w-fit border">
                            {test.conversion_url}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-sm text-slate-700 whitespace-nowrap">
                          {test.type == "copy" && <CopyPill />}
                          {test.type == "visibility" && <VisibilityPill />}
                          {test.type == "src" && <SrcPill />}
                        </td>
                        <td className="py-4 pl-4 text-sm text-slate-700 whitespace-nowrap flex justify-end">
                          {test.active ? <ActivePill /> : <DisabledPill />}
                        </td>
                      </tr>
                    </Link>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DashboardABTestTable;
