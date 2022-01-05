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

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const {user, setUser} = useUser();
  const [signupError, setSignupError] = useState(false);

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });

    if (response.status !== 200) {
      setSignupError(true);
      setLoading(false);
    } else {
      setSignupError(false);
      setLoading(false);
      const responseJSON = await response.json();
      const {token, user} = responseJSON;
      document.cookie = `token=${token.token};path=/`;
      document.cookie = `id=${user.id};path=/`;
      setUser(user);
      return Router.push("/dashboard");
    }
  };
  return (
    <>
      <Head>
        <title>TESTA/BLY. | Sign up</title>
        <meta property="og:title" content="TESTA/BLY. | Sign up" key="title" />
      </Head>
      <AuthContainer>
        <H1 text="Sign up" styles="text-center" />
        <Spacer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label
            htmlFor="email"
            className={`${labelClasses} ${
              emailError ? "text-red-500" : "text-stone-500"
            }`}
          >
            Email {emailError && emailErrorText}
            <input
              type="text"
              name="email"
              id="email"
              className={`${inputClasses} ${
                emailError ? "border-red-500" : "border-stone-200"
              }`}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onFocus={() => setEmailError(false)}
              placeholder="hello@testably.co"
            />
          </label>
          <label
            htmlFor="password"
            className={`${labelClasses} ${
              passwordError ? "text-red-500" : "text-stone-500"
            } relative`}
          >
            Password {passwordError && passwordErrorText}
            <input
              type={passwordFieldType}
              name="password"
              id="password"
              className={`${inputClasses} ${
                passwordError ? "border-red-500" : "border-stone-200"
              }`}
              onChange={(e) => setPassword(e.currentTarget.value)}
              onFocus={() => setPasswordError(false)}
              autoComplete="true"
              placeholder="•••••••"
            />
            <span
              className="absolute right-0 underline cursor-pointer hover:text-stone-600"
              onClick={togglePasswordVisibility}
            >
              show/hide
            </span>
          </label>
          {signupError && (
            <ErrorMessage
              text="Oops, looks like that email is already registered."
              styles="mt-4"
            />
          )}
          <PrimaryButton
            loading={loading}
            text="Sign up"
            styles="w-full mt-4"
          />
        </form>
        <div className="flex w-full justify-center mt-4 text-xs text-stone-500">
          Already have an account?&#160;
          <Link href="/auth/sign-in" passHref>
            <a className="underline hover:text-stone-600 transition-all">
              Sign in
            </a>
          </Link>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignUp;
