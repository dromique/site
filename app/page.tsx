import Image from "next/image";
import VerticalScrollSection from "./components/vertical-scroll-section";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full">
        <header className="flex items-center justify-center h-[10vh]">
          <h2 className="text-[40px] text-[#C26E4B] font-lora">DVW</h2>
        </header>
        <section className="h-screen flex items-center justify-center bg-[#F7EDE1]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C26E4B]">Section 1</h2>
            <p className="mt-4 text-[#333333]">Section content here</p>
          </div>
        </section>

        <section className="h-[50vh] flex items-center justify-center bg-[#333333]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C26E4B]">Wie ben ik</h2>
            <p className="mt-4 text-[#F7EDE1]">Section content here</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center bg-[#F7EDE1]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C26E4B]">Section 3</h2>
            <p className="mt-4 text-[#333333]">Section content here</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center bg-[#F7EDE1]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C26E4B]">Section 4</h2>
            <p className="mt-4 text-[#333333]">Section content here</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center bg-[#F7EDE1]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C26E4B]">Section 5</h2>
            <p className="mt-4 text-[#333333]">Section content here</p>
          </div>
        </section>
        <VerticalScrollSection />

        <footer className="flex items-center justify-center h-[100vh] bg-[#333333] dark:bg-[#333333]">
          <h2 className="text-[40px] text-[#C26E4B] font-lora">Dominique.vanwaardhuizen@gmail.com</h2>
        </footer>
      </main>
    </div>
  );
}
