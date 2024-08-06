import Input from "@/components/Input";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("signin");

  const toggleVaraint = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "signin" ? "signup" : "signin"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,

        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5 lg:op">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center     ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "signin" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "signup" && (
                <Input
                  type="text"
                  onChange={(ev: any) => {
                    setName(ev.target.value);
                  }}
                  value={name}
                  label="Username"
                  id="name"
                />
              )}

              <Input
                type="email"
                onChange={(ev: any) => {
                  setEmail(ev.target.value);
                }}
                value={email}
                label="Email"
                id="email"
              />
              <Input
                type="password"
                onChange={(ev: any) => {
                  setPassword(ev.target.value);
                }}
                value={password}
                label="Password"
                id="password"
              />
            </div>
            <button
              onClick={variant == "signin" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant == "signin" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant == "signin"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVaraint}
                className="text-white ml-1 hover:underline
               cursor-pointer"
              >
                {variant == "signin" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;
