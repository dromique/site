import Image from "next/image";

export default function Footer() {
    return (
        <footer id="site-footer" className="flex h-screen items-center justify-between bg-[#333333] px-12 py-16 dark:bg-[#333333]">
            {/* Left Column */}
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <h3 className="font-lora text-2xl text-[#C26E4B]">Vragen?</h3>
                <p className="text-[#F7EDE1] font-inter leading-relaxed">
                    Neem contact met me op via de contactgegevens of volg me op social media.
                </p>
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
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <h3 className="font-lora text-2xl text-[#C26E4B]">Contacteer me</h3>
                <p className="text-[#F7EDE1] font-inter leading-relaxed">
                    Laten we samen aan iets geweldigs werken.
                </p>
            </div>
        </footer>
    );
}