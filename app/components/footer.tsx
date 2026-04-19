import Image from "next/image";

export default function Footer() {
    return (
        <footer id="site-footer" className="flex h-screen items-center justify-center gap-8 bg-[#333333] px-12 py-16 dark:bg-[#333333]">
            {/* Left Column */}
            <div className="flex flex-1 flex-col items-start justify-start gap-4 text-start">                
                <h3 className="font-lora text-2xl text-[#C26E4B]">Stage semester 5</h3>
                <p className="text-[#F7EDE1] font-inter leading-relaxed">
                    Heeft u intresse? Neem contact met mij op! Ik zoek een stageplek voor de periode van 31 augustus 2026 t/m 22 januarie 2027.
                </p>
                <a href="mailto:dominique.vanwaardhuizen@gmail.com" className="text-[#C26E4B] hover:underline">E-mail: dominique.vanwaardhuizen@gmail.com</a>
                <a href="https://www.linkedin.com/in/dominique-van-waardhuizen-b453b4389/" target="_blank" rel="noopener noreferrer" className="text-[#C26E4B] hover:underline">LinkedIn: Dominique van Waardhuizen</a>
            </div>

            {/* Center Logo */}
            <div className="flex flex-1 items-center justify-center">
                <Image
                    src="/img/logo.svg"
                    alt="Homepage"
                    width={800}
                    height={320}
                    className="w-[500px] h-auto"
                    priority
                />
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col items-start justify-center gap-4 text-start">
                <h3 className="font-lora text-2xl text-[#C26E4B]">Gevolgde semesters</h3>
                <p className="text-[#F7EDE1] font-inter leading-relaxed">
                    Semester 1 - Orientatie <br />
                    Semester 2 - Interactive Media <br />
                    Semester 3 - Front End Development <br />
                    Semester 4 - Media Creation <br />
                </p>
            </div>
        </footer>
    );
}