import Image from "next/image";
import Header from "./components/header";
import VerticalScrollSection from "./components/vertical-scroll-section";
import AboveTheFold from "./components/above-the-fold";
import Whoami from "./components/who-am-i";
import Project1 from "./components/project1";
import Project2 from "./components/project2";
import Project3 from "./components/project3";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full">
        <Header />
        <AboveTheFold />
        <Whoami />
        {/* <Project1 />
        <Project2 />
        <Project3 /> */}
        <VerticalScrollSection />
        <Footer />
      </main>
    </div>
  );
}
