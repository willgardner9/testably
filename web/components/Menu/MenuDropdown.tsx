import {Menu, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import setLogoutCookies from "../../utils/setLogoutCookies";
import {
  ChevronDownIcon,
  LogoutIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import deleteToken from "../../utils/deleteToken";
import Router from "next/router";
import {IUser} from "../../types/IUser";
const cookieCutter = require("cookie-cutter");
import {useRouter} from "next/router";

const MenuDropdown: React.FC<{user: IUser}> = ({user}) => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = cookieCutter.get("token");
    await deleteToken(token);
    setLogoutCookies();
    Router.push("/auth/sign-in");
  };

  const handleNavigation = (href: string) => {
    Router.push(href);
  };

  const [stripeId, setStripeId] = useState<string>();

  useEffect(() => {
    setStripeId(user.stripe_id);
  }, [user]);

  const goToCheckout = async () => {
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/stripe/checkout`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stripeId,
        }),
      }
    );
    router.push(await response.text());
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800 bg-white rounded shadow-sm transition-all">
          <MenuIcon
            className="w-4 h-4 mr-2 -ml-1 text-slate-500 hover:text-slate-600"
            aria-hidden="true"
          />
          Menu
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-44 mt-2 origin-top-right bg-white divide-y divide-slate-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <h2 className="p-2 text-xxs uppercase text-slate-500">testa/bly</h2>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className={`${
                    active ? "bg-slate-100 text-slate" : "text-slate-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ChartBarIcon
                      className="w-5 h-5 mr-2 text-slate-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChartBarIcon
                      className="w-5 h-5 mr-2 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                  Dashboard
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <h2 className="p-2 text-xxs uppercase text-slate-500">account</h2>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => handleNavigation("/dashboard/settings")}
                  className={`${
                    active ? "bg-slate-100 text-slate" : "text-slate-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-slate-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => goToCheckout()}
                  className={`${
                    active ? "bg-slate-100 text-slate" : "text-slate-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CreditCardIcon
                      className="w-5 h-5 mr-2 text-slate-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <CreditCardIcon
                      className="w-5 h-5 mr-2 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                  Plans and billing
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-slate-100 text-slate" : "text-slate-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-slate-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
