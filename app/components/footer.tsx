import Image from "next/image";
import { withBasePath } from "@/app/lib/with-base-path";

export default function Footer() {
    return (
        <footer id="site-footer" className="flex min-h-[50vh] flex-col items-stretch justify-center gap-10 bg-[#333333] px-5 py-14 sm:px-8 md:flex-row md:items-start md:gap-8 md:px-12 md:py-16 dark:bg-[#333333]">
            {/* Left Column */}
            <div className="flex flex-1 flex-col items-start justify-start gap-4 text-start md:pt-10 lg:pt-14">                
                <h3 className="font-lora text-2xl text-[#C26E4B] sm:text-3xl">Stage semester 5</h3>
                <p className="max-w-prose text-[#F7EDE1] font-inter leading-relaxed text-sm sm:text-base">
                    Heeft u intresse? Neem contact met mij op! Ik zoek een stageplek voor de periode van 31 augustus 2026 t/m 22 januari 2027.
                </p>
                <a href="mailto:dominique.vanwaardhuizen@gmail.com" target="_blank" rel="noopener noreferrer" className="break-all text-[#C26E4B] hover:underline">E-mail: dominique.vanwaardhuizen@gmail.com</a>
                <a href="https://www.linkedin.com/in/dominique-van-waardhuizen-b453b4389/" target="_blank" rel="noopener noreferrer" className="text-[#C26E4B] hover:underline">LinkedIn: Dominique van Waardhuizen</a>
            </div>

            {/* Center Logo */}
            <div className="flex flex-1 items-center justify-center">
                <Image
                    src={withBasePath("/img/logo.svg")}
                    alt="Homepage"
                    width={800}
                    height={320}
                    className="h-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[500px]"
                    priority
                />
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col items-start justify-start gap-4 text-start md:pt-10 lg:pt-14">
                <h3 className="font-lora text-2xl text-[#C26E4B] sm:text-3xl">Gevolgde semesters</h3>
                <p className="text-sm leading-relaxed text-[#F7EDE1] font-inter sm:text-base">
                    Semester 1 - Orientatie <br />
                    Semester 2 - Interactive Media <br />
                    Semester 3 - Front End Development <br />
                    Semester 4 - Media Creation <br />
                </p>
            </div>
        </footer>
    );
}