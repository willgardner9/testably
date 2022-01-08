import type {NextPage} from "next";
import AuthContainer from "../../components/AuthContainer";
import Head from "next/head";
import H1 from "../../components/H1";
import Spacer from "../../components/Spacer";
import labelClasses from "../../components/Styles/labelClasses";
import inputClasses from "../../components/Styles/inputClasses";
import PrimaryButton from "../../components/PrimaryButton";
import {FormEvent, useState} from "react";
import {useUser} from "../../context/auth";
import toast, {Toaster} from "react-hot-toast";

const ForgottenPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/forgotten-password`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      }
    );

    if (response.status == 200) {
      setLoading(false);
      toast.success(`Reset password email sent to ${email}`);
    } else {
      setLoading(false);
      toast.error(`Failed to send a reset password email to ${email}`);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>TESTA/BLY. | Forgotten password</title>
        <meta
          property="og:title"
          content="TESTA/BLY. | Forgotten password"
          key="title"
        />
      </Head>
      <AuthContainer>
        <H1 text="Forgotten password" styles="text-center" />
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
          <PrimaryButton
            loading={loading}
            text="Send me a reset password email"
            styles="w-full mt-4"
          />
        </form>
      </AuthContainer>
    </>
  );
};

export default ForgottenPassword;
