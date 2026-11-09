"use client";

import { useEffect } from "react";
import ErrorState from "./components/common/ErrorState";

export default function RootError({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return <ErrorState reset={reset} />;
}