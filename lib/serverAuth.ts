import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./auth";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  console.log(currentUser);

  return { currentUser };
};

export const serverAuthSecondary = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, nextAuthConfig);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  console.log(currentUser);

  return { currentUser };
};

export default serverAuth;
