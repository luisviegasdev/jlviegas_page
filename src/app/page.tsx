/*
  Project: Lumo Digital Architecture & Development Hub
  Aesthetic: editorial-minimal — calm and precise
  Tone: professional and warm; quiet confidence, high-end positioning
  Fonts: PP Neue Montreal (body/display) + Geist (hero wordmark surname)
         — self-hosted from public/fonts/ via next/font/local
  Primary: #F0EFEB (canvas/highlight) — Secondary: #000000 — Accent: #E62815
  Memorable element: oversized PP Neue Montreal headlines set against
  the Geist-rendered surname wordmark; the red accent is reserved
  exclusively for interaction states.
*/

import { Hero } from "@/components/sections/Hero";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ReachOut } from "@/components/sections/ReachOut";
import { TheMechanism } from "@/components/sections/TheMechanism";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <TheMechanism />
      <ReachOut />
    </>
  );
}
