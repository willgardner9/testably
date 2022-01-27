import {PlusIcon} from "@heroicons/react/solid";
import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
import AddTestModal from "../../components/Dashboard/AddTestModal";
import DashboardABTestTable from "../../components/Dashboard/DashboardABTestTable";
import DashboardDataBox from "../../components/Dashboard/DashboardDataBox";
import FreeTrialBadge from "../../components/Dashboard/FreeTrialBadge";
import Placeholder from "../../components/Dashboard/Placeholder";
import H1 from "../../components/H1";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import SecondaryButton from "../../components/SecondaryButton";
import Spacer from "../../components/Spacer";
import {useUser} from "../../context/auth";
import {ITest} from "../../types/ITest";
import DashboardABTestCard from "../../components/Dashboard/DashboardABTestCard";
const cookieCutter = require("cookie-cutter");

const Home: NextPage = () => {
  const {user} = useUser();
  const [abTests, setAbTests] = useState<ITest[]>([]);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [sessions, setSessions] = useState();

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
      return setSessions(responseJSON.length);
    };
    fetchAbTests();
    fetchSessions();
  }, [user, testModalOpen]);

  return (
    <>
      <Head>
        <title>TESTA/BLY. | Dashboard</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <FreeTrialBadge user={user} />
        <Menu user={user} />
        <Content>
          <div className="flex justify-between items-end mb-4">
            <H1 text="Your A/B tests" />
            <SecondaryButton
              text="New A/B test"
              loading={false}
              icon={<PlusIcon className="w-4 h-4 mr-1" fill="currentColor" />}
              handleOnClick={() => setTestModalOpen(true)}
            />
          </div>
          {abTests?.length >= 1 ? (
            <div className="flex flex-col gap-4">
              <DashboardABTestCard data={abTests} />
            </div>
          ) : (
            <Placeholder>
              Start A/B testing in 5 minutes. Click{" "}
              <span className="inline-flex mx-2">
                {" "}
                <SecondaryButton
                  text="New A/B test"
                  loading={false}
                  icon={
                    <PlusIcon className="w-4 h-4 mr-1" fill="currentColor" />
                  }
                  handleOnClick={() => setTestModalOpen(true)}
                  ping
                />
              </span>{" "}
              to begin.
            </Placeholder>
          )}
          <H1 text="Usage" styles="mt-8" />
          <Spacer />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <DashboardDataBox
              label="Sessions"
              value={sessions || 0}
              outOfValue="/ 10,000"
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
