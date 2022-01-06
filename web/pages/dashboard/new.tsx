import type {NextPage} from "next";
import Head from "next/head";
import {FormEvent, useEffect, useState} from "react";
import ErrorMessage from "../../components/ErrorMessage";
import H1 from "../../components/H1";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import PrimaryButton from "../../components/PrimaryButton";
import Spacer from "../../components/Spacer";
import inputClasses from "../../components/Styles/inputClasses";
import labelClasses from "../../components/Styles/labelClasses";
import {useUser} from "../../context/auth";
const cookieCutter = require("cookie-cutter");
import toast, {Toaster} from "react-hot-toast";
import DangerButton from "../../components/DangerButton";
import SecondaryButton from "../../components/SecondaryButton";
import setLogoutCookies from "../../utils/setLogoutCookies";
import Router from "next/router";

const New: NextPage = () => {
  const {user, setUser} = useUser();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>TESTA/BLY. | Settings</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <Menu width="max-w-sm" />
        <Content width="max-w-sm">
          <div>
            <H1 text="New A/B test" />
            <Spacer />
          </div>
        </Content>
      </Container>
    </>
  );
};

export default New;
