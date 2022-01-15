import {PlusIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
import AddTestModal from "../../components/Dashboard/AddTestModal";
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
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [conversions, setConversions] = useState(0);

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
    const fetchSessions = async () => {
      if (!user.id) return;
      const token = cookieCutter.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/sessions/?user_id=${user.id}`,
        {
          method: "get",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseJSON = await response.json();
      return setUniqueSessions(responseJSON.length);
    };
    const fetchConversions = async () => {
      if (!user.id) return;
      const token = cookieCutter.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/conversions/?user_id=${user.id}`,
        {
          method: "get",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseJSON = await response.json();
      return setConversions(responseJSON.length);
    };
    fetchAbTests();
    fetchSessions();
    fetchConversions();
  }, [user, testModalOpen]);

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
              handleOnClick={() => setTestModalOpen(true)}
              ping={!abTests.length}
            />
          </div>
          <Spacer />
          <DashboardABTestTable data={abTests} />
          <H1 text="Monthly performance" styles="mt-8" />
          <Spacer />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <DashboardDataBox
              label="Unique sessions"
              value={uniqueSessions}
              outOfValue="/ 10,000"
            />
            <DashboardDataBox label="Conversions" value={conversions} />
            <DashboardDataBox
              label="CVR"
              value={`${((conversions / uniqueSessions) * 100).toFixed(2)}%`}
            />
          </div>
          <AddTestModal
            isOpen={testModalOpen}
            setIsOpen={setTestModalOpen}
            user={user}
          />
        </Content>
      </Container>
    </>
  );
};

export default Home;
