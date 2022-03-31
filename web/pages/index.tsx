import {PlayIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../components/Logo";
import Carrd from "../components/WorksWith/Carrd";
import Nextjs from "../components/WorksWith/Nextjs";
import Nuxtjs from "../components/WorksWith/Nuxtjs";
import Reactjs from "../components/WorksWith/Reactjs";
import Shopify from "../components/WorksWith/Shopify";
import Squarespace from "../components/WorksWith/Squarespace";
import Unbounce from "../components/WorksWith/Unbounce";
import Unicorn from "../components/WorksWith/Unicorn";
import Vue from "../components/WorksWith/Vue";
import Webflow from "../components/WorksWith/Webflow";
import Wordpress from "../components/WorksWith/Wordpress";
import {IoIosInfinite} from "react-icons/io";
import {CgBatteryFull} from "react-icons/cg";
import {RiLock2Line} from "react-icons/ri";
import {BsCheck, BsLightningCharge} from "react-icons/bs";
import {AiOutlineFieldTime} from "react-icons/ai";
import {HiOutlineCog} from "react-icons/hi";
import {RiDashboard3Line} from "react-icons/ri";
import {useState} from "react";
import {Switch} from "@headlessui/react";

const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(false);

  const features = [
    {
      name: "Unlimited tests & domains",
      description:
        "Set up as many A/B tests as you like on as many domains as you own. Perfect for indiehackers with multiple projects, freelancers, and agencies.",
      icon: (
        <IoIosInfinite className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
    {
      name: "Powerful tests",
      description:
        "A/B test copy, images, videos, and element visibility. Perfect for tring out different hero copy, CTAs, and element orders.",
      icon: (
        <CgBatteryFull className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
    {
      name: "Secure & privacy friendly",
      description:
        "All data is secured safely in EU servers. We don't track your users or store their personal data—and you own all your data.",
      icon: (
        <RiLock2Line className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
    {
      name: "Simple dashboard",
      description: (
        <>
          Ever felt lost on your Google Optimize dashboard? No more. The{" "}
          <span className="font-oswald">TESTA/BLY</span> dashboard tells you
          what you need to know at a glance.
        </>
      ),
      icon: (
        <RiDashboard3Line className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
    {
      name: "Blazing fast",
      description:
        "Our JavaScript snippet runs in the browser, so say goodbye to content flickering.",
      icon: (
        <BsLightningCharge className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
    {
      name: "Easy integration",
      description: (
        <>
          <span className="font-oswald">TESTA/BLY</span> integrates easily with
          all website builders, CMS and developer frameworks.
        </>
      ),
      icon: (
        <HiOutlineCog className="w-10 h-10 p-2 rounded-lg bg-green-600 text-white" />
      ),
    },
  ];

  const pricing = [
    {
      monthly: "£7",
      annual: "£70",
      sessions: "10,000",
    },
    {
      monthly: "£12",
      annual: "£120",
      sessions: "50,000",
    },
    {
      monthly: "£15",
      annual: "£150",
      sessions: "100,000",
    },
  ];

  const plansInclude = [
    "All features",
    "Unlimited A/B tests",
    "Unlimited websites & domains",
    "100% data ownership",
  ];

  return (
    <>
      <Head>
        <title>TESTA/BLY. | Simple A/B Testing</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <header className="w-screen bg-slate-900">
        <div className="absolute w-full hero-gradient"></div>
        <section className="w-full max-w-7xl mx-auto py-4 pt-8 flex items-center justify-between px-4 lg:px-0">
          <Logo light />
          <div className="flex gap-4 items-center">
            <Link href="/auth/sign-in" passHref>
              <a className="text-slate-400 text-base underline z-10">Sign in</a>
            </Link>
            <Link href="/auth/sign-up" passHref>
              <a className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all z-10">
                Start free trial
              </a>
            </Link>
          </div>
        </section>
      </header>
      <section className="w-screen landing-bg p-4 lg:px-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-slate-100 font-medium text-5xl text-center leading-tight z-10">
            Start A/B testing and increase your conversion rate
          </h1>
          <h2 className="text-slate-300 font-light text-xl text-center mt-4 z-10">
            A/B testing shouldn't be so difficult and time-consuming.{" "}
            <span className="font-oswald">TESTA/BLY</span> is a no-code A/B
            testing tool that makes optimizing your conversion rate quick and
            easy.
          </h2>
          <Link href="/auth/sign-up" passHref>
            <a className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all z-10 mt-4">
              Start free trial
            </a>
          </Link>
          <small className="text-slate-400 mt-4 text-base z-10">
            14 day free trial, no credit card required!
          </small>
          <div className="rounded-lg w-full h-96 bg-slate-100 mt-8 flex items-center justify-center z-10">
            <PlayIcon className="w-16 h-16 text-slate-400" />
          </div>
        </div>
      </section>
      <section className="w-screen p-4 lg:px-0">
        <div className="w-full mx-auto max-w-3xl flex items-center justify-center flex-col">
          <small className="text-slate-400 mt-4 text-base z-10">
            Integrates easily with
          </small>
          <div className="flex flex-wrap justify-evenly mt-6 gap-8">
            <Webflow />
            <Wordpress />
            <Unicorn />
            <Shopify />
            <Unbounce />
            <Squarespace />
            <Nextjs />
            <Reactjs />
            <Nuxtjs />
            <Vue />
            <Carrd />
          </div>
        </div>
      </section>
      <section className="w-screen p-4 lg:px-0">
        <div className="w-full mx-auto max-w-8xl flex flex-col">
          <h2 className="text-slate-900 font-semibold text-5xl text-center leading-tight my-16">
            Simple and powerful A/B testing
          </h2>
          <div className="w-full flex items-start mt-8 gap-8 flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-green-600 font-medium text-md">Simple</h4>
              <h3 className="text-slate-700 font-base text-3xl">
                Set up your A/B tests in 5 minutes
              </h3>
              <p className="text-slate-500 leading-8 mt-4">
                Google Optimize can take <span className="italic">hours</span>{" "}
                to install, set up, and configure. If you've ever sat there
                trying different combinations of CSS classes while hitting the
                refresh button, you know what we mean.{" "}
                <span className="font-oswald">TESTA/BLY</span> is simple by
                design - you'll have your A/B tests set up to optimize your
                conversion rate within 5 minutes.
              </p>
            </div>
            <div className="rounded-xl w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full drop-shadow-2xl rounded-xl">
                <Image
                  src="/5-min-setup.png"
                  width={1268}
                  height={914}
                  quality={100}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-start mt-20 gap-8 flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-green-600 font-medium text-md">Powerful</h4>
              <h3 className="text-slate-700 font-base text-3xl">
                Optimize text, images, videos, and element visibility
              </h3>
              <p className="text-slate-500 leading-8 mt-4">
                The most effective landing pages are usually a combination of
                good copy, images, and videos.{" "}
                <span className="font-oswald">TESTA/BLY</span> allows you to A/B
                test different variations of text, images and videos—or even
                toggle the visiblity of an element altogether, so you can find
                out what converts best.
              </p>
            </div>
            <div className="rounded-xl w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full drop-shadow-2xl rounded-xl">
                <Image
                  src="/powerful-tests.png"
                  width={1268}
                  height={914}
                  quality={100}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-start mt-20 gap-8 flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-green-600 font-medium text-md">
                Intelligent
              </h4>
              <h3 className="text-slate-700 font-base text-3xl">
                Understands statistical significance so you don't have to
              </h3>
              <p className="text-slate-500 leading-8 mt-4">
                A/B testing is only useful if the results are reliable and
                insightful—if they are statistically significant. This means
                that you can be certain the results are not due to randomness or
                chance. <span className="font-oswald">TESTA/BLY</span>{" "}
                calculates when your test reaches 95% statistical significance,
                so you can be sure whether your increase or decrease in
                conversion rate is the result of your A/B tests.
              </p>
            </div>
            <div className="rounded-xl w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full drop-shadow-2xl rounded-xl">
                <Image
                  src="/statistical-significance.png"
                  width={1268}
                  height={914}
                  quality={100}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-start mt-20 gap-8 flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-green-600 font-medium text-md">Fast</h4>
              <h3 className="text-slate-700 font-base text-3xl">
                Lightweight so your landing page stays fast
              </h3>
              <p className="text-slate-500 leading-8 mt-4">
                Using Google Analytics{" "}
                <span className="font-medium text-slate-800">(20.1kb)</span> +
                Google Tag Manager{" "}
                <span className="font-medium text-slate-800">(62.9kb)</span> +
                Google Optimize{" "}
                <span className="font-medium text-slate-800">(43.9kb)</span> = a
                landing page that is <span className="italic">much</span> slower
                than it should be. The{" "}
                <span className="font-oswald">TESTA/BLY</span> JavaScript
                snippet weighs in at only{" "}
                <span className="font-medium text-slate-800">1.6kb</span>, so it
                won't slow down your landing page. And{" "}
                <a href="https://www.cloudflare.com/en-gb/learning/performance/more/website-performance-conversion-rates/">
                  quick loading times mean higher conversion rates.
                  <span className="align-super text-xxs hover:underline">
                    1
                  </span>
                </a>
              </p>
            </div>
            <div className="rounded-xl w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full drop-shadow-2xl rounded-xl">
                <Image
                  src="/lightweight-script.png"
                  width={1268}
                  height={914}
                  quality={100}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen p-4 lg:px-0 mt-12">
        <div className="w-full mx-auto max-w-8xl flex flex-col">
          <h2 className="text-slate-900 font-semibold text-5xl text-center leading-tight my-16">
            Powerful features available on all plans
          </h2>
          <div className="w-full flex flex-wrap justify-evenly gap-4">
            {features.map((feature) => {
              return (
                <article
                  className="flex flex-col rounded-lg w-80 p-8 "
                  key={feature.name}
                >
                  {feature.icon}
                  <h4 className="text-slate-900 font-medium text-xl mt-2 leading-10">
                    {feature.name}
                  </h4>
                  <p className="text-slate-500 leading-8">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-screen p-4 lg:px-0 mt-12 pb-10">
        <div className="w-full mx-auto max-w-8xl flex items-center flex-col">
          <h2 className="text-slate-900 font-semibold text-5xl text-center leading-tight mt-8">
            Transparent pricing
          </h2>
          <Switch.Group>
            <div className="flex items-center mt-12 mb-8 md:mb-0">
              <Switch.Label className="mr-4 text-slate-700 max-w-3xl font-light text-xl">
                Monthly billing
              </Switch.Label>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-green-500" : "bg-slate-300"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <Switch.Label className="ml-4 text-slate-700 max-w-3xl font-light text-xl relative flex items-center">
                Yearly billing{" "}
                <span className="bg-orange-100 py-1 px-2 rounded-full text-orange-600 font-medium text-xs absolute w-fit md:-right-28 -bottom-8 md:-bottom-0">
                  2 months free
                </span>
              </Switch.Label>
            </div>
          </Switch.Group>
          <div className="w-full flex flex-col sm:flex-row justify-center gap-10 my-12">
            <div className="flex w-full sm:w-1/4 flex-col gap-4">
              {pricing.map((price) => {
                return (
                  <article
                    className="flex flex-col rounded-lg border pl-4 py-4"
                    key={price.monthly}
                  >
                    <h4 className="text-slate-900 font-medium text-xl leading-10">
                      {enabled
                        ? price.annual + " / year"
                        : price.monthly + " / month"}
                    </h4>
                    <p className="text-slate-500 leading-8">
                      {price.sessions} sessions / month
                    </p>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-col w-full items-center sm:items-start sm:w-1/4 bg-white">
              <h4 className="text-slate-900 font-medium text-xl leading-10">
                All plans include
              </h4>
              <ul>
                {plansInclude.map((feature) => {
                  return (
                    <li className="flex items-center" key={feature}>
                      <span>
                        <BsCheck className="text-green-600" />
                      </span>
                      <span className="ml-2 text-slate-500 leading-8 font-light">
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Link href="/auth/sign-up" passHref>
                <a className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all z-10 mt-4 w-fit">
                  Get started with a free trial
                </a>
              </Link>
              <a
                className="mt-6 underline text-xs font-light text-slate-500 w-fit"
                href=""
              >
                Have more traffic? Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen p-4 lg:px-0 py-12 bg-slate-900 relative mt-12">
        <div className="footer-gradient absolute w-full"></div>
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-slate-100 font-semibold text-4xl text-center leading-tight z-10">
            Ready to start A/B testing?
          </h2>
          <h3 className="text-slate-300 max-w-3xl font-light text-xl text-center mt-4 z-10">
            A/B testing shouldn't be so difficult and time-consuming.{" "}
            <span className="font-oswald">TESTA/BLY</span> is a no-code A/B
            testing tool that makes optimizing your conversion rate quick and
            easy.
          </h3>
          <Link href="/auth/sign-up" passHref>
            <a className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all z-10 mt-4">
              Start free trial
            </a>
          </Link>
          <small className="text-slate-400 mt-4 text-base z-10">
            14 day free trial, no credit card required!
          </small>
        </div>
      </section>
    </>
  );
};

export default Home;
