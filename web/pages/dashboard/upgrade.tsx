import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
import H1 from "../../components/H1";
import Container from "../../components/Layout/Container";
import Content from "../../components/Layout/Content";
import Menu from "../../components/Layout/Menu";
import PrimaryButton from "../../components/PrimaryButton";
import Spacer from "../../components/Spacer";
import {useUser} from "../../context/auth";
const cookieCutter = require("cookie-cutter");
import BenefitBullet from "../../components/BenefitBullet";
import {useRouter} from "next/router";

const Settings: NextPage = () => {
  const router = useRouter();
  const {user} = useUser();
  const [stripeId, setStripeId] = useState<string>();

  useEffect(() => {
    setStripeId(user.stripe_id);
  }, [user]);

  const upgradeBenefits = [
    "Unlimited A/B tests",
    "Unlimited variations",
    "Up to 100,000 sessions a month",
    "Unlimited conversions",
  ];

  const goToCheckout = async () => {
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/stripe/checkout`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stripeId,
        }),
      }
    );
    router.push(await response.text());
  };

  return (
    <>
      <Head>
        <title>TESTA/BLY. | Upgrade</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <Menu user={user} width="max-w-sm" />
        <Content width="max-w-sm">
          <div>
            <H1 text="Upgrade account" />
            <Spacer />
            <p className="text-slate-500 mb-6">
              To continue using TESTA/BLY you'll need to upgrade to a paid plan.
            </p>
            {upgradeBenefits.map((benefit: string) => {
              return (
                <BenefitBullet benefit={benefit} colour="green" key={benefit} />
              );
            })}
            <PrimaryButton
              loading={false}
              text="Upgrade account"
              styles="w-full"
              handleOnClick={() => goToCheckout}
            />
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Settings;
