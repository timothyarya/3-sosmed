"use client";

import React, { useContext, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";

const page = () => {
  const router = useRouter();
  const { session } = useContext(AuthContext);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      <Navbar />
      <div>Home Page</div>
    </>
  );
};

export default page;
