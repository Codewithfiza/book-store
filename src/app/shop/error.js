"use client";

import { useEffect } from "react";
import ErrorState from "../components/common/ErrorState";

export default function ShopError({ error, reset }) {
  useEffect(() => {
    console.error("Shop page error:", error);
  }, [error]);

  return (
    <ErrorState
      message="We couldn't load the shop right now. Please try again in a moment."
      reset={reset}
    />
  );
}