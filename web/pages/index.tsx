import {PlayIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../components/Logo";
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

const Home: NextPage = () => {
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
            Works with
          </small>
          <div className="flex flex-wrap justify-evenly mt-6 gap-10">
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
                Optimise text, images, videos, and element visibility
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
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen p-4 lg:px-0 mt-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-slate-900 font-semibold text-4xl text-center leading-tight z-10">
            Ready to start A/B testing?
          </h2>
          <h3 className="text-slate-700 max-w-3xl font-light text-xl text-center mt-4 z-10">
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
