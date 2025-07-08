"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {theme, setTheme} = useTheme();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", { username, password, redirect: false });
      if (response.ok) {
        // console.log('submit');
          router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <section className="flex flex-col h-dvh w-dvw justify-center items-center gap-3 select-none">
        <div className="flex bg-nav w-100 rounded-2xl p-3 justify-center text-nav-text font-bold cursor-pointer default-transition" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <h1>Click Here to Change Theme. Current: {theme}</h1>
        </div>
  
        
      <div className="flex flex-col bg-nav rounded-2xl p-10 justify-between items-start gap-7 w-100 default-transition">
        <div className="flex flex-col w-full justify-center items-center text-center gap-1">
          <h1 className="font-black text-4xl text-nav-text font-mono antialiased">Welcome</h1>

          <p className="font-normal text-lg text-nav-text antialiased">
            Sign In to Your Account
          </p>
        </div>

        <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-bold text-nav-text">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full bg-nav-secondary rounded-lg border-black dark:border-white px-4 py-2 text-nav-text placeholder:antialiased"
              placeholder="masuk ahhh"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between w-full gap-10">
              <label className="font-bold text-nav-text">Password</label>

              <Link
                href="/auth/register"
                className="font-bold text-nav-text"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-nav-secondary rounded-lg border-black dark:border-white px-4 py-2 text-nav-text"
              required
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <button
              type="submit"
              className="bg-nav-secondary rounded-lg px-5 py-3 text-center font-bold text-nav-text text-xl font-mono cursor-pointer hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex flex-col justify-center items-start text-nav-text">
          <p>
            Don't Have an Account? <Link
              href="./register"
              className="font-bold text-nav-text"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
