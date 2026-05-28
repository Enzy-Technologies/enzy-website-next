"use client";

import { createContext } from "react";

export const PhoneViewContext = createContext<{ inView: boolean }>({
  inView: false,
});
