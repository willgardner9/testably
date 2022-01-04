import "../styles/globals.css";
import type {AppProps} from "next/app";
import {AuthWrapper} from "../context/auth";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  );
}

export default MyApp;
