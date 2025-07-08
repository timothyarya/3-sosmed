"use client";

import React, { use, useContext, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import { useTheme } from "next-themes";


const page = () => {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  const {theme, setTheme} = useTheme();


  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [session]);

  return (
    <>
      {/* <Navbar /> */}
      <div>Home Page</div>
      <button className="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>theme</button>
    </>
  );
};

export default page;
