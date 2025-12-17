"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroSequence from "@/components/IntroSequence";
import HorizontalScrollWrapper from "@/components/HorizontalScrollWrapper";
import Scene1Hook from "@/components/scenes/Scene1Hook";
import Scene2Flashback from "@/components/scenes/Scene2Flashback";
import Scene3Action from "@/components/scenes/Scene3Action";
import Scene4Credits from "@/components/scenes/Scene4Credits";
import CinemaStageFrame from "@/components/CinemaStageFrame";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="bg-neutral-950 min-h-screen text-white">
      <CinemaStageFrame />

      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSequence key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10" // Ensure content is behind frame but clickable
        >
          <HorizontalScrollWrapper>
            <Scene1Hook />
            <Scene2Flashback />
            <Scene3Action />
            <Scene4Credits />
          </HorizontalScrollWrapper>
        </motion.div>
      )}
    </main>
  );
}
