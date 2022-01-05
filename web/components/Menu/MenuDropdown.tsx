import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import setLogoutCookies from "../../utils/setLogoutCookies";
import {
  ChevronDownIcon,
  LogoutIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
} from "@heroicons/react/solid";
import deleteToken from "../../utils/deleteToken";
import Router from "next/router";
const cookieCutter = require("cookie-cutter");

export default function MenuDropdown() {
  const handleLogout = async () => {
    const token = cookieCutter.get("token");
    await deleteToken(token);
    setLogoutCookies();
    Router.push("/auth/sign-in");
  };

  const handleNavigation = (href: string) => {
    Router.push(href);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-800 bg-white hover:bg-stone-200 shadow border border-stone-800 rounded-md transition-all">
          Menu
          <ChevronDownIcon
            className="w-4 h-4 ml-2 -mr-1 text-stone-500 hover:text-stone-600"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <h2 className="p-2 text-xxs uppercase text-stone-500">testa/bly</h2>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className={`${
                    active ? "bg-stone-200 text-stone" : "text-stone-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ChartBarIcon
                      className="w-5 h-5 mr-2 text-stone-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChartBarIcon
                      className="w-5 h-5 mr-2 text-stone-400"
                      aria-hidden="true"
                    />
                  )}
                  Dashboard
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <h2 className="p-2 text-xxs uppercase text-stone-500">account</h2>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => handleNavigation("/dashboard/settings")}
                  className={`${
                    active ? "bg-stone-200 text-stone" : "text-stone-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-stone-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-stone-400"
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
                  onClick={() => handleNavigation("/dashboard/billing")}
                  className={`${
                    active ? "bg-stone-200 text-stone" : "text-stone-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CreditCardIcon
                      className="w-5 h-5 mr-2 text-stone-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <CreditCardIcon
                      className="w-5 h-5 mr-2 text-stone-400"
                      aria-hidden="true"
                    />
                  )}
                  Billing
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
                    active ? "bg-stone-200 text-stone" : "text-stone-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-stone-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-stone-400"
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
}
