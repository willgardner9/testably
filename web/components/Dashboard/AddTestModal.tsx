import {Dialog, RadioGroup, Transition} from "@headlessui/react";
import {Fragment, FormEvent} from "react";
import H1 from "../H1";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import Spacer from "../Spacer";
import inputClasses from "../Styles/inputClasses";
import labelClasses from "../Styles/labelClasses";
import {useState} from "react";
import {
  EyeOffIcon,
  PhotographIcon,
  TranslateIcon,
  XIcon,
} from "@heroicons/react/solid";
const cookieCutter = require("cookie-cutter");
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";

const AddTestModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Function;
  user: any;
}> = ({isOpen, setIsOpen, user}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [conversion, setConversion] = useState("");
  const [conversionError, setConversionError] = useState(false);

  const types = [
    {
      dbType: "copy",
      uiType: "Copy",
      description: "A/B test different variations of text or copy",
      icon: <TranslateIcon className="h-4 w-4 min-w-max text-slate-400" />,
      iconChecked: (
        <TranslateIcon className="h-4 w-4 min-w-max text-slate-300" />
      ),
    },
    {
      dbType: "visibility",
      uiType: "Visibility",
      description: "A/B test showing or hiding an element",
      icon: <EyeOffIcon className="h-4 w-4 min-w-max text-slate-400" />,
      iconChecked: <EyeOffIcon className="h-4 w-4 min-w-max text-slate-300" />,
    },
    {
      dbType: "src",
      uiType: "Image or video",
      description: "A/B test with different images or videos",
      icon: <PhotographIcon className="h-4 w-4 min-w-max text-slate-400" />,
      iconChecked: (
        <PhotographIcon className="h-4 w-4 min-w-max text-slate-300" />
      ),
    },
  ];

  const [type, setType] = useState(types[0]["dbType"]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //  name validation
    if (!name || name === "") {
      setNameError(true);
      setLoading(false);
      return;
    }

    //  conversion url validation
    if (!conversion || conversion === "") {
      setConversionError(true);
      setLoading(false);
      return;
    }

    const token = cookieCutter.get("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/tests`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.id,
        name,
        type,
        active: true,
        conversionUrl: conversion,
      }),
    });
    const responseJSON = await response.json();
    if (response.status == 200) {
      toast.success(`Created A/B test ${responseJSON.name}`);
      setLoading(false);
      router.push(`dashboard/abtests/${responseJSON.id}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm border rounded-lg border-slate-200 relative">
                <XIcon
                  className="h-5 w-5 min-w-max text-slate-400 hover:text-slate-500 transition-all cursor-pointer absolute right-4 top-4"
                  onClick={() => setIsOpen(false)}
                />
                <H1 text="New A/B test" />
                <Spacer />
                <p className="text-sm text-slate-500">
                  Add a name and conversion URL and select a type for your new
                  A/B test. If you get stuck, refer to our{" "}
                  <a
                    href="TODO"
                    target="_blank"
                    className="underline hover:text-slate-600"
                  >
                    guide to setting A/B tests
                  </a>{" "}
                  with TESTA/BLY.
                </p>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label
                    htmlFor="name"
                    className={`${labelClasses} ${
                      nameError ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    A/B test name{" "}
                    {nameError &&
                      "- you need to provide a name for your A/B test"}
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`${inputClasses} ${
                        nameError ? "border-red-500" : "border-slate-200"
                      }`}
                      onChange={(e) => setName(e.currentTarget.value)}
                      onFocus={() => setNameError(false)}
                      placeholder="Eg 'Hero text'"
                    />
                  </label>
                  <label
                    htmlFor="conversion"
                    className={`${labelClasses} ${
                      conversionError ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    Conversion URL{" "}
                    {conversionError &&
                      "- you need to provide a conversion URL for your A/B test"}
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`${inputClasses} ${
                        conversionError ? "border-red-500" : "border-slate-200"
                      }`}
                      onChange={(e) => setConversion(e.currentTarget.value)}
                      onFocus={() => setConversionError(false)}
                      placeholder="Eg '/signup?success=true'"
                    />
                  </label>
                  <RadioGroup value={type} onChange={setType}>
                    <RadioGroup.Label
                      className={`${labelClasses} text-slate-500 mb-2`}
                    >
                      A/B test type
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <RadioGroup.Option
                          key={type.dbType}
                          value={type.dbType}
                          className={({active, checked}) =>
                            `${
                              active
                                ? "ring-2 ring-offset-2 ring-offset-green-500 ring-white ring-opacity-60"
                                : ""
                            } ${
                              checked
                                ? "bg-slate-700 border-slate-900 text-white"
                                : "bg-white"
                            } relative rounded-lg  px-5 py-4 cursor-pointer flex focus:outline-none  border rounded shadow-sm text-slate-700 transition-all hover:border-slate-300`
                          }
                        >
                          {({active, checked}) => (
                            <>
                              <div className={`flex items-center w-full gap-4`}>
                                {checked ? type.iconChecked : type.icon}
                                <div className="flex items-center">
                                  <div className="text-base">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`${
                                        checked
                                          ? "font-medium text-white"
                                          : "text-slate-500"
                                      }`}
                                    >
                                      {type.uiType}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="p"
                                      className={`text-slate-500 text-sm mt-1 ${
                                        checked ? "text-slate-300" : ""
                                      }`}
                                    >
                                      {type.description}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                  <PrimaryButton
                    loading={loading}
                    text="Create A/B test"
                    styles="w-full mt-4"
                  />
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddTestModal;
