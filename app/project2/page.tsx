import AnimatedBird from "../components/animated-bird";
import AboveTheFold from "../components/above-the-fold";

export default function Project2() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full">
            <AboveTheFold 
                title="Project 2" 
                subtitle="Project 2 beschrijving hier"
                bird={<AnimatedBird src="/img/bird3/bird3.png" alt="Bird decoration" width={618} height={543} />}
            />
        </main>
    </div>
    );
}