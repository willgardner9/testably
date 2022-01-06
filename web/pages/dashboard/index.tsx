import type {NextPage} from "next";
import Head from "next/head";
import H1 from "../../components/H1";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import Spacer from "../../components/Spacer";
import {useUser} from "../../context/auth";

const Home: NextPage = () => {
  const {user} = useUser();
  return (
    <>
      <Head>
        <title>TESTA/BLY. | Dashboard</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <Menu />
        <Content>
          <H1 text="Dashboard" />
          <Spacer />
        </Content>
      </Container>
    </>
  );
};

export default Home;
