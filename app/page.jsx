"use client";

import React, { use, useContext, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import { useTheme } from "next-themes";
import Wrapper from "./components/Wrapper/Wrapper";


const page = () => {
  const router = useRouter();
  const { session } = useContext(AuthContext);
  const {theme, setTheme} = useTheme();

  const themeSelector = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [session]);

  return (
    <>
      <Wrapper>
      <h1>haiaiaiai</h1>
      </Wrapper>
    </>
    
  )
}

export default page;
