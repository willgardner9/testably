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
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useUser();
  const {id, token} = router.query;

  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const togglePasswordVisibility = () => {
    passwordFieldType === "password"
      ? setPasswordFieldType("text")
      : setPasswordFieldType("password");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //  password validation
    if (!password || password === "") {
      setPasswordError(true);
      setPasswordErrorText("- you need to provide a password");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/reset-password`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id, password}),
      }
    );

    if (response.status == 200) {
      setLoading(false);
      toast.success(`Password reset, redirecting you soon...`);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    } else {
      setLoading(false);
      toast.error(`Failed to reset password`);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>TESTA/BLY. | Reset password</title>
        <meta
          property="og:title"
          content="TESTA/BLY. | Reset password"
          key="title"
        />
      </Head>
      <AuthContainer>
        <H1 text="Reset password" styles="text-center" />
        <Spacer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label
            htmlFor="password"
            className={`${labelClasses} ${
              passwordError ? "text-red-500" : "text-slate-500"
            } relative`}
          >
            Password {passwordError && passwordErrorText}
            <input
              type={passwordFieldType}
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
            <button
              className="absolute right-0 underline cursor-pointer hover:text-slate-600"
              onClick={togglePasswordVisibility}
            >
              show/hide
            </button>
          </label>
          <PrimaryButton
            loading={loading}
            text="Set new password"
            styles="w-full mt-4"
          />
        </form>
      </AuthContainer>
    </>
  );
};

export default ResetPassword;
