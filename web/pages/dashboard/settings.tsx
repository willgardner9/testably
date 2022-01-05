import type {NextPage} from "next";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import {useUser} from "../../context/auth";

const Home: NextPage = () => {
  const {user} = useUser();
  return (
    <Container>
      <Menu />
      <Content>
        <div>settings</div>
      </Content>
    </Container>
  );
};

export default Home;
