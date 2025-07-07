"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AuthContext from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState({});

  useEffect(() => {
    if (status === "authenticated") {
      setData({ authenticated: true, session });
    } else {
      setData({ authenticated: false });
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={data}>
      {!data && status === "loading" && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center">
          <h1 className="text-2xl text-white font-black">
            Loading account data...
          </h1>
        </div>
      )}
      {status !== "loading" && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
