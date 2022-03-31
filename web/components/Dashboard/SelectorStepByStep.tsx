const SelectorStepByStep: any = ({}) => {
  const steps = [
    {
      number: "1",
      title: "Go to your website",
      instructions:
        "Open a new tab and go to the webiste you want to add your A/B test to. These instructions are for Google Chrome. If you are using a different browser you'll still be able to follow them, but some of the icons and menu options will look different!",
    },
    {
      number: "2",
      title: "Right click and press 'Inspect'",
      instructions:
        "On your website, right click anywhere and press 'Inspect' on the menu that pops up, it should be near the bottom.",
    },
    {
      number: "3",
      title: "Press this button",
      instructions:
        "In the menu that pops up, press the button that looks like a mouse cursor in a browser window. It should be in the top left of your menu. When it's selected, you will be able to hover over and highlight elements on your website.",
    },
    {
      number: "4",
      title: "Click the element you want to A/B test",
      instructions:
        "Scroll through your page and find the element you want to A/B test. Left click it and, in the window on the right hand side, you'll see the code for the element you selected highlighted.",
    },
    {
      number: "5",
      title: "Right click and 'Copy selector'",
      instructions:
        "Right click the code for the highlighted element and press 'Copy selector'. Paste this selector in the input below and press 'Add element'.",
    },
  ];

  return (
    <div className="mt-8">
      {steps.map((step: any) => {
        return (
          <div
            className="flex items-start gap-2 pb-4 mb-4 border-b last-of-type:border-b-0 border-slate-200"
            key={step.title}
          >
            <div className="flex w-1/3 pr-8">
              <div
                className={`w-8 h-8 p-2 bg-green-100 flex items-center justify-center rounded-full`}
              >
                <div
                  className={`w-4 h-4 text-green-500 flex items-center justify-center font-bold `}
                >
                  {step.number}
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-3">
                <h3 className="text-slate-700 text-base mt-1 font-normal">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-7">
                  {step.instructions}
                </p>
              </div>
            </div>
            <div className="w-2/3 ">
              <video
                className="rounded-lg cursor-pointer transition-all"
                muted
                controls
              >
                <source
                  src={`/select-element-step-${step.number}.webm`}
                  type="video/webm"
                />
              </video>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectorStepByStep;
