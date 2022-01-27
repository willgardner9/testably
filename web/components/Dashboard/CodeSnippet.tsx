import {ClipboardCopyIcon} from "@heroicons/react/solid";
import {ITest} from "../../types/ITest";
import {IUser} from "../../types/IUser";
import generateSnippet from "../../utils/generateSnippet";
import SecondaryButton from "../SecondaryButton";
import toast, {Toaster} from "react-hot-toast";
import Spacer from "../Spacer";
import H1 from "../H1";

const CodeSnippet: React.FC<{
  userData: IUser;
  testData: ITest;
  variationsData: any;
  generateNewSnippet: boolean;
  setGenerateNewSnippet: Function;
}> = ({
  userData,
  testData,
  variationsData,
  generateNewSnippet,
  setGenerateNewSnippet,
}) => {
  const variations: any = {};
  variationsData.forEach((variation: any) => {
    if (variation.active) {
      variations[variation.id] = variation.value;
    }
  });
  const copySnippetToClipboard = () => {
    setGenerateNewSnippet(false);
    navigator.clipboard
      .writeText(
        generateSnippet(
          userData.id,
          testData.id,
          testData.test_page,
          testData.conversion_url,
          testData.selector,
          testData.type,
          variations
        )
      )
      .then(() => toast.success("Copied to clipboard!"));
  };
  return (
    <>
      <div className="flex justify-between items-end">
        <H1 text="Embed code" styles="mt-8" />
        <SecondaryButton
          text="Copy embed code"
          icon={<ClipboardCopyIcon className="w-4 h-4 mr-1" />}
          loading={false}
          styles="w-fit"
          handleOnClick={() => copySnippetToClipboard()}
          ping={generateNewSnippet}
        />
      </div>
      <Spacer />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          <div
            className={`w-8 h-8 p-2 bg-green-100 flex items-center justify-center rounded-full`}
          >
            <div
              className={`w-4 h-4 text-green-500 flex items-center justify-center font-bold `}
            >
              1
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            <h3 className="text-slate-700 text-base mt-1 font-normal">
              When to embed your code
            </h3>
            <p className="text-slate-500 text-sm font-light leading-7">
              You need to embed our JavaScript snippet on your website so that
              your A/B tests work. You will need to generate a new snippet every
              time you make a change to your A/B test; for example, updating
              your test page URL, conversion page URL, target element, or adding
              a variable.{" "}
              <span className="font-semibold">
                If the 'Copy embed code' button above is pinging green, you need
                to re-install your snippet.
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className={`w-8 h-8 p-2 bg-green-100 flex items-center justify-center rounded-full`}
          >
            <div
              className={`w-4 h-4 text-green-500 flex items-center justify-center font-bold `}
            >
              2
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            <h3 className="text-slate-700 text-base mt-1 font-normal">
              How to install
            </h3>
            <p className="text-slate-500 text-sm font-light leading-7">
              Installing the snippet is easy. Press 'Copy embed code' and then
              paste the code inside the end of your body tag, like so:
            </p>
            <pre className="font-mono p-3 text-slate-600 bg-slate-50 rounded-md flex flex-col w-fit border-2 select-none">
              <code>{`<body>`}</code>
              <code>{`  ...`}</code>
              <code>{`  ...`}</code>
              <code>{`  paste embed code here`}</code>
              <code>{`</body>`}</code>
            </pre>
            <p className="text-slate-500 text-sm font-light leading-7">
              If you're unsure of how to install the snippet on the platform
              your website is running on, Google 'Add JavaScript snippet to
              [platform]' or reach out to support at your platform provider. Or
              take a look at these guides for popular platforms:
            </p>
            <ul className="text-slate-500 text-sm font-light leading-7 list-disc list-inside underline transition-all">
              <li className="hover:text-slate-700 hover:bg-slate-100 transition-all w-fit px-2 rounded-md">
                <a href="https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags">
                  Webflow
                </a>
              </li>
              <li className="hover:text-slate-700 hover:bg-slate-100 transition-all w-fit px-2 rounded-md">
                <a href="https://carrd.co/docs/building/embedding-custom-code">
                  Carrrd
                </a>
              </li>
              <li className="hover:text-slate-700 hover:bg-slate-100 transition-all w-fit px-2 rounded-md">
                <a href="https://help.unicornplatform.com/en/category/widgets-and-integrations-r288wt/">
                  Unicorn Platform
                </a>
              </li>
              <li className="hover:text-slate-700 hover:bg-slate-100 transition-all w-fit px-2 rounded-md">
                <a href="https://documentation.unbounce.com/hc/en-us/articles/203879070-Adding-Custom-Scripts-and-CSS-in-the-Classic-Builder">
                  Unbounce
                </a>
              </li>
              <li className="hover:text-slate-700 hover:bg-slate-100 transition-all w-fit px-2 rounded-md">
                <a href="https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-code-to-your-site">
                  Squarespace
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className={`w-8 h-8 p-2 bg-orange-100 flex items-center justify-center rounded-full`}
          >
            <div
              className={`w-4 h-4 text-orange-500 flex items-center justify-center font-bold `}
            >
              3
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            <h3 className="text-slate-700 text-base mt-1 font-normal">
              Troubleshooting
            </h3>
            <p className="text-slate-500 text-sm font-light leading-7">
              If you get stuck embedding your code, or you have embedded your
              code but don't think your A/B test is working, please double check
              that your target page URL, conversion page URL, and selector are
              correct -- your A/B test won't work without them. Otherwise,
              please don't hesitate to contact us and we'll be happy to help
              troubleshoot and get your tests set up!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeSnippet;
