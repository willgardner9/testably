import {LockClosedIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ActivePill from "../../../components/Dashboard/ActivePill";
import CopyPill from "../../../components/Dashboard/CopyPill";
import DisabledPill from "../../../components/Dashboard/DisabledPill";
import SrcPill from "../../../components/Dashboard/SrcPill";
import VisibilityPill from "../../../components/Dashboard/VisibilityPill";
import H1 from "../../../components/H1";
import Container from "../../../components/Layout/Container";
import Content from "../../../components/Layout/Content";
import Menu from "../../../components/Layout/Menu";
import Spacer from "../../../components/Spacer";
import {useUser} from "../../../context/auth";
import {ITest} from "../../../types/ITest";
import toast, {Toaster} from "react-hot-toast";
import SecondaryButton from "../../../components/SecondaryButton";

const cookieCutter = require("cookie-cutter");

const ABTest: NextPage = () => {
  const router = useRouter();
  const {user} = useUser();
  const [testData, setTestData] = useState<ITest>({} as ITest);
  const [conversionUrl, setConversionUrl] = useState<string>("");
  const [abTestName, setAbTestName] = useState<string>("");
  const {id} = router.query;

  useEffect(() => {
    const token = cookieCutter.get("token");
    const fetchData = async () => {
      if (!id) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/tests/${id}`,
        {
          method: "get",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseJSON = await response.json();
      setConversionUrl(responseJSON.conversion_url);
      setAbTestName(responseJSON.name);
      setTestData(responseJSON);
    };
    fetchData();
  }, [router.query]);

  const toggleTestActive = async (state: boolean) => {
    if (state == testData.active) return;
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tests/${id}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          active: state,
        }),
      }
    );
    response.status == 200 &&
      toast.success(`Set A/B test to ${state ? "active" : "disabled"}`);
    setTestData(await response.json());
  };

  const updateTestConversionUrl = async () => {
    if (testData.conversion_url == conversionUrl) return;
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tests/${id}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversionUrl,
        }),
      }
    );
    response.status == 200 &&
      toast.success(`Set A/B test conversion URL to ${conversionUrl}`);
    setTestData(await response.json());
  };

  const updateAbTestName = async () => {
    if (testData.name == abTestName) return;
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/tests/${id}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: abTestName,
        }),
      }
    );
    response.status == 200 &&
      toast.success(`Set A/B test name to ${abTestName}`);
    setTestData(await response.json());
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>TESTA/BLY. | Dashboard</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <Menu />
        <Content>
          <div className="flex items-center gap-4">
            {abTestName && (
              <input
                type="text"
                className="font-medium text-2xl leading-10 text-slate-700 max-w-100"
                onChange={(e) =>
                  setAbTestName(e.target.value ? e.target.value : " ")
                }
                onBlur={() => updateAbTestName()}
                size={abTestName.length}
                defaultValue={testData.name}
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row text-xxs gap-2 md:gap-4 text-slate-500 my-2">
            <p className="font-light">
              Created at:{" "}
              <span className="font-normal">
                {new Date(testData.created_at).toLocaleDateString()}
              </span>
            </p>
            <p className="font-light">
              Updated at:{" "}
              <span className="font-normal">
                {new Date(testData.updated_at).toLocaleDateString()}
              </span>
            </p>
          </div>
          <Spacer />
          <div className="flex flex-col md:flex-row max-w-100 gap-4 flex-wrap md:divide-x divide-slate-200">
            <div className="flex items-center gap-2 max-w-100">
              <div className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider min-w-max">
                Conversion URL:
              </div>
              <input
                className="text-sm font-mono text-slate-700 whitespace-nowrap max-w-100 overflow-x-scroll"
                type="text"
                onChange={(e) =>
                  setConversionUrl(e.target.value ? e.target.value : " ")
                }
                onBlur={() => updateTestConversionUrl()}
                size={conversionUrl.length}
                defaultValue={testData.conversion_url}
              />
            </div>
            <div className="flex items-center gap-2 md:pl-4">
              <div className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Active:
              </div>
              <button
                onClick={() => toggleTestActive(!testData.active)}
                className="text-sm font-mono text-slate-700 whitespace-nowrap select-none cursor-pointer"
              >
                {testData.active ? <ActivePill /> : <DisabledPill />}
              </button>
            </div>
            <div className="flex items-center gap-2 md:pl-4">
              <LockClosedIcon className="w-3 h-3 text-slate-400" />
              <div className="flex items-center text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type:
              </div>
              <div className="text-sm font-mono text-slate-700 whitespace-nowrap">
                {testData.type == "copy" && <CopyPill />}
                {testData.type == "visibility" && <VisibilityPill />}
                {testData.type == "src" && <SrcPill />}
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default ABTest;
