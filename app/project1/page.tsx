import AnimatedBird from "../components/animated-bird";
import AboveTheFold from "../components/above-the-fold";

export default function Project1() {
    return (
        <div className="bg-zinc-50 font-sans dark:bg-black">
            <main className="w-full">
                <AboveTheFold 
                    title="Project 1" 
                    subtitle="Project 1 beschrijving hier"
                    bird={<AnimatedBird src="/img/bird2/bird2.png" alt="Bird decoration" width={576} height={505} />}
                />
            </main>
        </div>
    );
}