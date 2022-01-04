import React, {createContext, useContext, useState, useEffect} from "react";
import cookieCutter from "cookie-cutter";
import Router from "next/router";

interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  current_plan: string;
}

interface AuthContextType {
  user: User;
  setUser: Function;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthWrapper({children}: any) {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const attemptAuth = async () => {
      const token = cookieCutter.get("token");
      const userId = cookieCutter.get("id");
      if (!user.id && token && userId) {
        console.log("hi");
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
        user && Router.push("/app");
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
