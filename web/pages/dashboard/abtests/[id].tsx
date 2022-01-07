import {LockClosedIcon, PlusIcon} from "@heroicons/react/solid";
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
  useState<boolean>(false);
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
      return setTestData(await response.json());
    };
    fetchData();
  }, [router.query]);

  const toggleTestActive = async (state: boolean) => {
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
          <H1 text={testData.name} />
          <Spacer />
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Conversion URL:
              </div>
              <input
                className="text-sm font-mono text-slate-700 whitespace-nowrap"
                type="text"
                placeholder={testData.conversion_url}
                onChange={(e) => setConversionUrl(e.target.value)}
                onBlur={() => updateTestConversionUrl()}
              />
            </div>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Active:
              </div>
              <div
                onClick={() => toggleTestActive(!testData.active)}
                className="text-sm font-mono text-slate-700 whitespace-nowrap select-none cursor-pointer"
              >
                {testData.active ? <ActivePill /> : <DisabledPill />}
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="flex items-center text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type:
              </div>
              <div className="text-sm font-mono text-slate-700 whitespace-nowrap">
                {testData.type == "copy" && <CopyPill />}
                {testData.type == "visibility" && <VisibilityPill />}
                {testData.type == "src" && <SrcPill />}
              </div>
              <LockClosedIcon className="w-3 h-3 text-slate-400" />
            </div>
          </div>
          <pre>{JSON.stringify(testData, null, 2)}</pre>
        </Content>
      </Container>
    </>
  );
};

export default ABTest;
