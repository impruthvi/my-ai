"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("41ca00c8-7cbc-43bd-9761-3f032567b32a");
  }, []);
  return null;
};
