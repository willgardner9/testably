import {IUser} from "../../types/IUser";
import Logo from "../Logo";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

const FreeTrialBadge: React.FC<{user: IUser}> = ({user}) => {
  const router = useRouter();
  const [trialEndsIn, setTrialEndsIn] = useState<number>();

  useEffect(() => {
    function addDays(date: string, days: number) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const dayTrialEnds = addDays(user.created_at, 14);
    const dateNow = new Date();

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a: Date, b: Date) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const diffDate = dateDiffInDays(dateNow, dayTrialEnds);

    if (diffDate <= 1 && user?.current_plan === "trial") {
      router.push("/dashboard/upgrade");
    }

    setTrialEndsIn(diffDate);
  }, [user]);

  return user?.current_plan === "trial" ? (
    <div className="fixed bottom-4 right-4 flex z-50 shadow">
      <div className="rounded-l-md bg-white border-b border-t border-l border-slate-200 flex items-center gap-2 py-1 px-2">
        <Logo fontSize="text-xs" logoSize={25} />
        <div className="h-full flex items-center text-xs text-slate-700">
          Free trial days remaining: {trialEndsIn} days
        </div>
      </div>
      <Link href="/dashboard/upgrade">
        <span className="rounded-r-md bg-green-500 border-green-600 hover:bg-green-400 hover:border-green-500 transition-all border-t border-b border-r text-white text-xs flex items-center py-1 px-2 cursor-pointer">
          Upgrade
        </span>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default FreeTrialBadge;
