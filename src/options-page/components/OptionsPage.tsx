import React, { useEffect } from "react";
import { useAnkiStore } from "../stores";
import { ConfigTabs } from "./ConfigTabs";
import { Footer } from "./Footer";

export function OptionsPage() {
  const fetchAnki = useAnkiStore((state) => state.fetchAnki);
  useEffect(() => {
    fetchAnki();
  }, [fetchAnki]);

  return (
    <form action="#" className="relative flex flex-col h-full ">
      <ConfigTabs />
      <Footer />
    </form>
  );
}
