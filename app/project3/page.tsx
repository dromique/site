import AnimatedBird from "../components/animated-bird";
import AboveTheFold from "../components/above-the-fold";

export default function Project3Page() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full">
            <AboveTheFold 
                title="Project 3" 
                subtitle="Project 3 beschrijving hier"
                bird={<AnimatedBird src="/img/bird4/bird4.png" alt="Bird decoration" width={781} height={598} />}
            />
        </main>
    </div>
  );
}