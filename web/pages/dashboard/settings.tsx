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
import FreeTrialBadge from "../../components/Dashboard/FreeTrialBadge";

const Settings: NextPage = () => {
  const {user, setUser} = useUser();
  useEffect(() => {
    setEmail(user.email);
  }, [user]);
  let [email, setEmail] = useState(user.email);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [updateError, setUpdateError] = useState(false);

  const [showDeleteButtons, setShowDeleteButtons] = useState(true);

  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const togglePasswordVisibility = () => {
    passwordFieldType === "password"
      ? setPasswordFieldType("text")
      : setPasswordFieldType("password");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //  email validation
    if ((!email || email === "") && !password) {
      setEmailError(true);
      setEmailErrorText("- you need to provide an email");
      setLoading(false);
      return;
    }

    if (email.indexOf("@") === -1) {
      setEmailError(true);
      setEmailErrorText("- you need to provide a valid email");
      setLoading(false);
      return;
    }

    if (email === user.email && !password) {
      setLoading(false);
      setEmailError(false);
      setEmailErrorText("");
      return;
    }

    const token = cookieCutter.get("token");

    if (email === user.email) {
      email = "";
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/users/${user.id}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({email, password}),
      }
    );

    if (response.status !== 200) {
      setUpdateError(true);
      setLoading(false);
    } else {
      setUpdateError(false);
      setLoading(false);
      const responseJSON = await response.json();
      setUser(responseJSON);
      toast.success("Updated account settings");
    }
  };

  const deleteAccount = async () => {
    const token = cookieCutter.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/users/${user.id}`,
      {
        method: "delete",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      toast.error("Unable to delete account at the moment");
    } else {
      setLogoutCookies();
      toast.success("Successfully deleted account, redirecting you...");
      setTimeout(() => {
        Router.push("/");
      }, 2000);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>TESTA/BLY. | Settings</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <Container>
        <FreeTrialBadge user={user} />
        <Menu width="max-w-sm" user={user} />
        <Content width="max-w-sm">
          <div>
            <H1 text="Account settings" />
            <Spacer />
            <form onSubmit={(e) => handleSubmit(e)}>
              <label
                htmlFor="email"
                className={`${labelClasses} ${
                  emailError ? "text-red-500" : "text-slate-500"
                }`}
              >
                Update email {emailError && emailErrorText}
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`${inputClasses} ${
                    emailError ? "border-red-500" : "border-slate-200"
                  }`}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  onFocus={() => setEmailError(false)}
                  placeholder={user.email}
                />
              </label>
              <label
                htmlFor="password"
                className={`${labelClasses} text-slate-500 relative`}
              >
                Update password
                <input
                  type={passwordFieldType}
                  name="password"
                  id="password"
                  className={`${inputClasses} border-slate-200`}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  autoComplete="true"
                  placeholder="•••••••"
                />
                <button
                  className="absolute right-0 underline cursor-pointer hover:text-slate-600"
                  onClick={togglePasswordVisibility}
                >
                  show/hide
                </button>
              </label>
              {updateError && (
                <ErrorMessage
                  text="We couldn't sign in with those credentials."
                  styles="mt-4"
                />
              )}
              <PrimaryButton
                loading={loading}
                text="Update settings"
                styles="w-full mt-4"
              />
            </form>
            <H1 text="Danger zone" styles="mt-8" />
            <Spacer />
            <p className="text-sm text-slate-500">
              Deleting your account deletes all user data, A/B test data,
              variations data, and conversions data. This action cannot be
              reversed or recovered.
            </p>
            <DangerButton
              text="Delete account"
              loading={false}
              styles={`w-full mt-4 ${!showDeleteButtons ? "hidden" : ""}`}
              handleOnClick={() => setShowDeleteButtons(!showDeleteButtons)}
            />
            <div className="flex gap-4">
              <DangerButton
                text="Delete account forever"
                loading={false}
                styles={`w-full mt-4 ${showDeleteButtons ? "hidden" : ""}`}
                handleOnClick={() => deleteAccount()}
                isPrimary={!showDeleteButtons}
              />
              <SecondaryButton
                text="Cancel"
                loading={false}
                styles={`mt-4 ${showDeleteButtons ? "hidden" : ""}`}
                handleOnClick={() => setShowDeleteButtons(!showDeleteButtons)}
              />
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Settings;
