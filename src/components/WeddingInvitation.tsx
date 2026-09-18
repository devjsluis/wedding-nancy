"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { InvitationCover } from "@/components/InvitationCover";

import { Hero } from "@/components/sections/Hero";
import { Countdown } from "@/components/sections/Countdown";
import { EventDetails } from "@/components/sections/EventDetails";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";
import { DressCode } from "@/components/sections/DressCode";
import { Hotels } from "@/components/sections/Hotels";
import { Banner } from "@/components/sections/Banner";
import { Footer } from "@/components/sections/Footer";

export function WeddingInvitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && <InvitationCover onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-[#f8f5ef] text-[#42594a]">
        <Hero />
        <Countdown />
        <EventDetails />
        <Story />
        <Gallery />
        <DressCode />
        <Hotels />
        <Banner />
        <Footer />
      </main>
    </>
  );
}
