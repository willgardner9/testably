import React, {createContext, useContext, useState, useEffect} from "react";
const cookieCutter = require("cookie-cutter");
import Router from "next/router";
import {IUser} from "../types/IUser";

interface AuthContextType {
  user: IUser;
  setUser: Function;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthWrapper({children}: any) {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const attemptAuth = async () => {
      const token = cookieCutter.get("token");
      const userId = cookieCutter.get("id");
      if (!user.id && token && userId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/users/${userId}`,
          {
            method: "get",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = await response.json();
        setUser(user);
        if (
          Router.route === "/auth/sign-in" ||
          Router.route === "/auth/sign-up"
        ) {
          Router.push("/dashboard");
        }
      } else {
        Router.route.indexOf("dashboard") !== -1 &&
          Router.push("/auth/sign-in");
      }
    };
    attemptAuth();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
}
