import type {NextPage} from "next";
import AuthContainer from "../../components/AuthContainer";
import Head from "next/head";
import H1 from "../../components/H1";
import Spacer from "../../components/Spacer";
import labelClasses from "../../components/Styles/labelClasses";
import inputClasses from "../../components/Styles/inputClasses";
import PrimaryButton from "../../components/PrimaryButton";
import {FormEvent, useState} from "react";
import ErrorMessage from "../../components/ErrorMessage";
import {useUser} from "../../context/auth";
import Router from "next/router";
import Link from "next/link";
import setLoginCookies from "../../utils/setLoginCookies";

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const {user, setUser} = useUser();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //  email validation
    if (!email || email === "") {
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

    //  password validation
    if (!password || password === "") {
      setPasswordError(true);
      setPasswordErrorText("- you need to provide a password");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/login`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      }
    );

    if (response.status !== 200) {
      setLoginError(true);
      setLoading(false);
    } else {
      setLoginError(false);
      setLoading(false);
      const responseJSON = await response.json();
      const {token, user} = responseJSON;
      setLoginCookies(token, user);
      setUser(user);
      return Router.push("/dashboard");
    }
  };
  return (
    <>
      <Head>
        <title>TESTA/BLY. | Sign in</title>
        <meta property="og:title" content="TESTA/BLY. | Sign in" key="title" />
      </Head>
      <AuthContainer>
        <H1 text="Sign in" styles="text-center" />
        <Spacer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label
            htmlFor="email"
            className={`${labelClasses} ${
              emailError ? "text-red-500" : "text-slate-500"
            }`}
          >
            Email {emailError && emailErrorText}
            <input
              type="text"
              name="email"
              id="email"
              className={`${inputClasses} ${
                emailError ? "border-red-500" : "border-slate-200"
              }`}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onFocus={() => setEmailError(false)}
              placeholder="hello@testably.co"
            />
          </label>
          <label
            htmlFor="password"
            className={`${labelClasses} ${
              passwordError ? "text-red-500" : "text-slate-500"
            }`}
          >
            Password {passwordError && passwordErrorText}
            <input
              type="password"
              name="password"
              id="password"
              className={`${inputClasses} ${
                passwordError ? "border-red-500" : "border-slate-200"
              }`}
              onChange={(e) => setPassword(e.currentTarget.value)}
              onFocus={() => setPasswordError(false)}
              autoComplete="true"
              placeholder="•••••••"
            />
          </label>
          {loginError && (
            <ErrorMessage
              text="We couldn't sign in with those credentials."
              styles="mt-4"
            />
          )}
          <PrimaryButton
            loading={loading}
            text="Sign in"
            styles="w-full mt-4"
          />
        </form>
        <div className="flex w-full justify-center mt-4 text-xs text-slate-500">
          <Link href="/auth/reset-password" passHref>
            <a className="underline hover:text-slate-600 transition-all">
              Rest password
            </a>
          </Link>
          <div className="mx-2 select-none">-</div>
          <Link href="/auth/sign-up" passHref>
            <a className="underline hover:text-slate-600 transition-all">
              Sign up
            </a>
          </Link>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignIn;
