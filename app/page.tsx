import Image from "next/image";
import VerticalScrollSection from "./components/vertical-scroll-section";
import AboveTheFold from "./components/above-the-fold";
import Whoami from "./components/who-am-i";
import AnimatedBird from "./components/animated-bird";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full">
        <AboveTheFold 
          title="Dominique van Waardhuizen" 
          subtitle="Semester 4 HBO ICT & Media Design Student"
          bird={<AnimatedBird src="/img/bird1/bird1base.png" alt="Bird decoration" width={480} height={547} motionType="base" />}
          beak={<AnimatedBird src="/img/bird1/bird1Underbeak.png" alt="Bird beak decoration" width={480} height={547} motionType="underbeak" />}
          wings={<AnimatedBird src="/img/bird1/bird1wing.png" alt="Bird wing decoration" width={480} height={547} motionType="wing" />}
        />
        <Whoami />
        <VerticalScrollSection />
      </main>
    </div>
  );
}
