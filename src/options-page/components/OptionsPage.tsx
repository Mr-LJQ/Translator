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
    <div
      className={`
        w-11/12 
        min-w-[40rem]
        h-[35rem]
        my-12
        mx-auto 
        rounded-xl
        shadow-lg 
        bg-white
      `}
    >
      <form action="#" className="relative flex flex-col rounded-lg h-full">
        <ConfigTabs />
        <Footer />
      </form>
    </div>
  );
}
