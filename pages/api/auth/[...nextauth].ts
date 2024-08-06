import NextAuth from "next-auth/next";
import { nextAuthConfig } from "@/lib/auth";

export default NextAuth(nextAuthConfig);
