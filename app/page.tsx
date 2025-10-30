import Image from "next/image";
import VerticalScrollSection from "./components/vertical-scroll-section";
import AboveTheFold from "./components/above-the-fold";
import Whoami from "./components/who-am-i";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full">
  <AboveTheFold />
        <Whoami />
    <VerticalScrollSection />
      </main>
    </div>
  );
}
