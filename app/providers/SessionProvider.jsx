"use client";

import { SessionProvider as Session } from "next-auth/react";

import React from "react";

const SessionProvider = ({ children }) => {
  return <Session>{children}</Session>;
};

export default SessionProvider;
