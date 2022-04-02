import {Dialog, Transition} from "@headlessui/react";
import {Fragment, FormEvent} from "react";
import H1 from "../H1";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import Spacer from "../Spacer";
import inputClasses from "../Styles/inputClasses";
import labelClasses from "../Styles/labelClasses";
import {useState, useEffect} from "react";
import {XIcon} from "@heroicons/react/solid";
const cookieCutter = require("cookie-cutter");
import toast, {Toaster} from "react-hot-toast";
import SelectorStepByStep from "./SelectorStepByStep";

const SelectorModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Function;
  testId: string;
}> = ({isOpen, setIsOpen, testId}) => {
  const [loading, setLoading] = useState(false);
  const [selector, setSelector] = useState("");
  const [selectorError, setSelectorError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selector) {
      setLoading(false);
      return setSelectorError(true);
    }

    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tests/${testId}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          selector,
        }),
      }
    );
    if (response.status == 200) {
      setLoading(false);
      toast.success(`Added a new element!`);
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
              <div className="inline-block w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm border rounded-lg border-slate-200 relative">
                <XIcon
                  className="h-5 w-5 min-w-max text-slate-400 hover:text-slate-500 transition-all cursor-pointer absolute right-4 top-4"
                  onClick={() => setIsOpen(false)}
                />
                <H1 text="Add new element" />
                <Spacer />
                <SelectorStepByStep />
                <form
                  className="max-w-sm mx-auto"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <label
                    htmlFor="selector"
                    className={`${labelClasses} ${
                      selectorError ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    Element selector{" "}
                    {selectorError &&
                      "- you need to paste your element's selector here"}
                    <input
                      type="text"
                      name="value"
                      id="value"
                      className={`${inputClasses} ${
                        selectorError ? "border-red-500" : "border-slate-200"
                      }`}
                      onChange={(e) => setSelector(e.currentTarget.value)}
                      onFocus={() => setSelectorError(false)}
                      placeholder="Eg '#email-form > input.submit-button.w-button'"
                    />
                  </label>
                  <PrimaryButton
                    text="Add new element"
                    loading={loading}
                    styles="w-full"
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

export default SelectorModal;
