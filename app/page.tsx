import Image from "next/image";
import Header from "./components/header";
import VerticalScrollSection from "./components/vertical-scroll-section";
import AboveTheFold from "./components/above-the-fold";
import Whoami from "./components/who-am-i";
import Project1 from "./project1/page";
import Project2 from "./project2/page";
import Project3 from "./project3/project3";
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
