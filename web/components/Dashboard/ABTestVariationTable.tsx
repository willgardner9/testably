import ActivePill from "./ActivePill";
import DisabledPill from "./DisabledPill";

const ABTestVariationTable: React.FC<{
  data: any;
  loading: boolean;
  handleToggleVariationActive: Function;
}> = ({data, loading, handleToggleVariationActive}) => {
  return loading ? (
    <div className="overflow-x-auto">
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
        <tbody className="bg-white divide-y divide-slate-200">
          <tr className="hover:bg-slate-50 h-12 bg-slate-100 animate-pulse">
            <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pl-4 text-sm text-slate-700 whitespace-nowrap flex justify-end"></td>
          </tr>
          <tr className="hover:bg-slate-50 h-12 bg-slate-200 animate-pulse">
            <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pl-4 text-sm text-slate-700 whitespace-nowrap flex justify-end"></td>
          </tr>
          <tr className="hover:bg-slate-50 h-12 bg-slate-100 animate-pulse">
            <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap"></td>
            <td className="py-4 pl-4 text-sm text-slate-700 whitespace-nowrap flex justify-end"></td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div className="overflow-x-scroll shadow-sm py-2 px-4 border border-slate-200 rounded-md font-light leading-7">
      <table className="w-full">
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
        <tbody className="bg-white">
          {data?.length &&
            data.map((variation: any) => {
              return (
                <tr
                  className="border-y border-slate-100 last:border-b-0"
                  key={variation.id}
                >
                  <td className="py-4 pr-4 text-base text-slate-700 whitespace-nowrap">
                    {variation.value}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {variation.sessions_count}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {variation.conversions_count}
                  </td>
                  <td className="py-4 pr-4 text-sm font-mono text-slate-700 whitespace-nowrap">
                    {variation.conversions_count == 0 ||
                    variation.sessions_count == 0
                      ? "0%"
                      : (
                          (variation.conversions_count /
                            variation.sessions_count) *
                          100
                        ).toFixed(2) + `%`}
                  </td>
                  <td className="py-4 text-sm text-slate-700 whitespace-nowrap text-right">
                    {variation.active ? (
                      <button
                        onClick={() =>
                          handleToggleVariationActive(variation.id, false)
                        }
                      >
                        <ActivePill />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleToggleVariationActive(variation.id, true)
                        }
                      >
                        <DisabledPill />
                      </button>
                    )}
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
