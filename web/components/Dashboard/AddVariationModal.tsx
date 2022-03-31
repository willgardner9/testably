import {Dialog, Transition} from "@headlessui/react";
import {Fragment, FormEvent} from "react";
import H1 from "../H1";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import Spacer from "../Spacer";
import inputClasses from "../Styles/inputClasses";
import labelClasses from "../Styles/labelClasses";
import {useState} from "react";
import {XIcon} from "@heroicons/react/solid";
const cookieCutter = require("cookie-cutter");
import toast, {Toaster} from "react-hot-toast";

const AddVariationModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Function;
  userId: string;
  testId: string;
  variationsData: any;
  setGenerateNewSnippet: Function;
}> = ({
  isOpen,
  setIsOpen,
  userId,
  testId,
  variationsData,
  setGenerateNewSnippet,
}) => {
  const [loading, setLoading] = useState(false);
  const [variation, setVariation] = useState("");
  const [variationError, setVariationError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!variation) {
      setLoading(false);
      return setVariationError(true);
    }

    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/variations`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          testId,
          value: variation,
          active: true,
        }),
      }
    );
    if (response.status == 200) {
      setLoading(false);
      toast.success(`Created a new variation ${variation}!`);
      if (variationsData.length === 1) {
        setGenerateNewSnippet(true);
      }
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
                <H1 text="Add new variation" />
                <Spacer />

                <form onSubmit={(e) => handleSubmit(e)}>
                  <label
                    htmlFor="value"
                    className={`${labelClasses} ${
                      variationError ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    Variation value{" "}
                    {variationError &&
                      "- you need to provide a value for your variation"}
                    <input
                      type="text"
                      name="value"
                      id="value"
                      className={`${inputClasses} ${
                        variationError ? "border-red-500" : "border-slate-200"
                      }`}
                      onChange={(e) => setVariation(e.currentTarget.value)}
                      onFocus={() => setVariationError(false)}
                      placeholder="Eg 'Privacy-friendly A/B testing'"
                    />
                  </label>
                  <PrimaryButton
                    text="Add new variation"
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

export default AddVariationModal;
