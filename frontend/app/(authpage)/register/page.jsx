"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username, 
        password
      })
      if (response.status === 200) {
        // console.log('submit');
          router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <section className="flex h-dvh w-dvw justify-center items-center">
      <div className="flex flex-col bg-gray-200 dark:bg-gray-800 rounded-2xl p-10 justify-between items-start gap-7 w-100">
        <div className="flex flex-col w-full justify-center items-center text-center gap-1">
          <h1 className="font-black text-4xl font-mono antialiased">Register</h1>

          <p className="font-normal text-lg antialiased">
            Create new account
          </p>
        </div>

        <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-bold">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg border-black dark:border-white px-4 py-2 text-black dark:text-gray-300 placeholder:antialiased"
              placeholder="kontol"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between w-full gap-10">
              <label className="font-bold">Password</label>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300 dark:bg-gray-700 rounded-lg border-black dark:border-white px-4 py-2 text-black dark:text-gray-300"
              required
            />
          </div>

          {/* <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between w-full gap-10">
              <label className="font-bold">Confirm Password</label>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300 dark:bg-gray-700 rounded-lg border-black dark:border-white px-4 py-2 text-black dark:text-gray-300"
              required
            />
          </div> */}

          <div className="flex flex-col items-center justify-center w-full">
            <button
              type="submit"
              className="bg-gray-400 dark:bg-gray-600 rounded-lg px-5 py-3 text-center font-bold text-gray-100 dark:text-gray-300 text-xl font-mono cursor-pointer transition ease-in-out duration-300 hover:scale-105"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex flex-col justify-center items-start">
          <p>
            Don't Have an Account?
            <Link
              href="/auth/register"
              className="font-bold dark:text-gray-400"
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
