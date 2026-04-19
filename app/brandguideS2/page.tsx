import Image from "next/image";

export default function BrandGuideS2Page() {
	const images = Array.from({ length: 12 }, (_, index) => `/img/brandguideS2/bg${index + 1}.png`);

	return (
		<main className="min-h-screen bg-[#F7EDE1] px-4 py-20 sm:px-6 md:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 md:gap-8">
				{images.map((src, index) => (
					<Image
						key={src}
						src={src}
						alt={`Brand guide semester 2 pagina ${index + 1}`}
						width={1920}
						height={1080}
						className="h-auto w-full rounded-xl object-cover"
						priority={index === 0}
					/>
				))}
			</div>
		</main>
	);
}