"use client";

import React, { use, useContext, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import { useTheme } from "next-themes";
import UiWrapper from "./components/Wrapper/UiWrapper";
import ContentWrapper from "./components/Wrapper/ContentWrapper";
import ContentCard from "./components/Content/ContentCard";


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
    <UiWrapper>
      <ContentWrapper>
        <ContentCard tweetContent={'Pariwisata berkelanjutan menjadi solusi penting untuk menjaga kelestarian alam dan budaya suatu daerah. Dengan menerapkan praktik ramah lingkungan, seperti mengurangi sampah plastik dan mendukung usaha lokal, kita bisa menikmati keindahan destinasi wisata tanpa merusak ekosistem. Selain itu, edukasi kepada pengunjung tentang pentingnya menjaga kebersihan dan menghormati adat setempat juga menjadi kunci agar pariwisata bisa berkembang secara bertanggung jawab untuk generasi mendatang.'}/>
      </ContentWrapper>
    </UiWrapper>
    </>
    
  )
}

export default page;
