import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import H1 from "../H1";
import Spacer from "../Spacer";
import {XIcon} from "@heroicons/react/solid";
import SelectorStepByStep from "./SelectorStepByStep";

const SelectorTutorialModal: React.FC<{
  isOpen: boolean;
  setIsOpen: Function;
}> = ({isOpen, setIsOpen}) => {
  return (
    <>
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
                <H1 text="How to get your selector" />
                <Spacer />

                <SelectorStepByStep />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SelectorTutorialModal;
