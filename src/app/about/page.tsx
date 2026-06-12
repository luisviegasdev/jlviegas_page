import type { Metadata } from "next";

import { BackgroundEvolution } from "@/components/sections/BackgroundEvolution";
import { Philosophy } from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "About | Lumo",
  description:
    "Structural precision, engineering integrity, and the minimalist aesthetic that defines our digital production workflow.",
};

export default function AboutPage() {
  return (
    <>
      <Philosophy />
      <BackgroundEvolution />
    </>
  );
}
