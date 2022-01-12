import {PlusIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import Router from "next/router";
import {useEffect, useState} from "react";
import DashboardABTestTable from "../../components/Dashboard/DashboardABTestTable";
import DashboardDataBox from "../../components/Dashboard/DashboardDataBox";
import H1 from "../../components/H1";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import SecondaryButton from "../../components/SecondaryButton";
import Spacer from "../../components/Spacer";
import {useUser} from "../../context/auth";
import {ITest} from "../../types/ITest";
const cookieCutter = require("cookie-cutter");

const Home: NextPage = () => {
  const {user} = useUser();
  const [abTests, setAbTests] = useState<ITest[]>([]);
  useEffect(() => {
    const fetchAbTests = async () => {
      if (!user.id) return;
      const token = cookieCutter.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/tests/?user_id=${user.id}`,
        {
          method: "get",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return setAbTests(await response.json());
    };
    fetchAbTests();
  }, [user]);

  return (
    <>
      <Head>
        <title>TESTA/BLY. | Dashboard</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <Menu />
        <Content>
          <div className="flex justify-between items-end">
            <H1 text="Your A/B tests" />
            <SecondaryButton
              text="New A/B test"
              loading={false}
              icon={<PlusIcon className="w-4 h-4 mr-1" fill="currentColor" />}
              handleOnClick={() => Router.push("/dashboard/abtests/new")}
              ping={!abTests.length}
            />
          </div>
          <Spacer />
          <DashboardABTestTable data={abTests} />
          <H1 text="Quick stats" styles="mt-8" />
          <Spacer />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <DashboardDataBox
              label="Unique visitors"
              value="100"
              outOfValue="/ 10,000"
            />
            <DashboardDataBox label="Conversions" value="10" />
            <DashboardDataBox label="CVR" value="10%" />
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Home;
