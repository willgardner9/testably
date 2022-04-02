import {
  CursorClickIcon,
  LockClosedIcon,
  BeakerIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import {ITest} from "../../types/ITest";
import H2 from "../H2";
import ActivePill from "./ActivePill";
import CopyPill from "./CopyPill";
import DisabledPill from "./DisabledPill";
import SrcPill from "./SrcPill";
import VisibilityPill from "./VisibilityPill";

const DashboardABTestCard: React.FC<{
  data: ITest[];
}> = ({data}) => {
  return (
    <>
      {data.length &&
        data.map((test: ITest) => {
          return (
            <article
              className="border-b border-slate-200 pb-6 last-of-type:border-b-0 hover:border-slate-300 first-of-type:pt-0 pt-4 last-of-type:pb-0 transition-all"
              key={test.id}
            >
              <Link href={`dashboard/abtests/${test.id}`} passHref>
                <a>
                  <div className="h-auto min-w-max border-slate-200 hover:border-slate-300 flex gap-4 items-center transition-all">
                    <div className="w-full flex justify-between">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                          <H2 styles="hover:underline" text={test.name} />
                          <div className="text-xs font-mono text-slate-700 whitespace-nowrap ">
                            {test.type == "copy" && <CopyPill />}
                            {test.type == "visibility" && <VisibilityPill />}
                            {test.type == "src" && <SrcPill />}
                          </div>
                        </div>

                        {/* TEST PAGE URL */}
                        <div className="min-w-max mb-1 flex gap-4 items-center">
                          <div className="flex gap-2 items-center w-36  rounded-md">
                            <BeakerIcon className="w-4 h-4 text-emerald-500" />
                            <div className="text-xs font-medium text-slate-700 uppercase tracking-wider min-w-max">
                              Test page URL
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm font-light leading-7 underline">
                            {test.test_page}
                          </p>
                        </div>
                        {/* CONVERSION URL */}
                        <div className="min-w-max mb-1 flex gap-4 items-center">
                          <div className="flex gap-2 items-center w-36  rounded-md">
                            <CursorClickIcon className="w-4 h-4 text-emerald-500" />
                            <div className="text-xs font-medium text-slate-700 uppercase tracking-wider min-w-max">
                              Conversion URL
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm font-light leading-7 underline">
                            {test.conversion_url}
                          </p>
                        </div>
                        {/* TARGET ELEMENT */}
                        <div className="min-w-max flex gap-4 items-center">
                          <div className="flex justify-between">
                            <div className="flex gap-2 items-center w-36  rounded-md">
                              <TemplateIcon className="w-4 h-4 text-emerald-500" />
                              <div className="text-xs font-medium text-slate-700 uppercase tracking-wider min-w-max">
                                Target element
                              </div>
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm font-light leading-7">
                            {test.selector}
                          </p>
                        </div>
                      </div>
                      <div className="flex-col justify-end">
                        <div className="flex justify-end">
                          {" "}
                          {/* STATUS */}
                          {/* <div className="p-4 rounded-md min-w-max">
                          <div className="flex gap-2 items-center mb-2">
                            {test.active ? (
                              <StatusOnlineIcon className="w-3 h-3 text-slate-400" />
                            ) : (
                              <StatusOfflineIcon className="w-3 h-3 text-slate-400" />
                            )}
                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider min-w-max">
                              Status
                            </div>
                          </div>
                          <span className="text-sm font-mono text-slate-700 whitespace-nowrap select-none cursor-pointer">
                            {test.active ? <ActivePill /> : <DisabledPill />}
                          </span>
                        </div> */}
                          {/* TYPE */}
                          {/* <div className="pt-4 pl-2 rounded-md min-w-max">
                            <div className="flex gap-2 items-center items-center justify-end">
                              <LockClosedIcon className="w-3 h-3 text-slate-400" />
                              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider min-w-max">
                                Type
                              </div>
                            </div>
                            <div className="text-sm font-mono text-slate-700 whitespace-nowrap mt-2">
                              {test.type == "copy" && <CopyPill />}
                              {test.type == "visibility" && <VisibilityPill />}
                              {test.type == "src" && <SrcPill />}
                            </div>
                          </div> */}
                        </div>

                        {/* <div className="flex flex-col text-xs gap-2 text-slate-500 mt-2 items-end">
                          <p className="font-light">
                            Created at:{" "}
                            <span className="font-normal">
                              {new Date(test.created_at).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="font-light">
                            Updated at:{" "}
                            <span className="font-normal">
                              {new Date(test.updated_at).toLocaleDateString()}
                            </span>
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          );
        })}
    </>
  );
};

export default DashboardABTestCard;
