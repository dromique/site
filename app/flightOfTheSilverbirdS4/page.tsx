import { withBasePath } from "@/app/lib/with-base-path";

export default function CvPage() {
	return (
		<main className="min-h-screen bg-[#F7EDE1] px-4 py-20 sm:px-6 md:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg">
					{/* Embed video in page */}
					<iframe className="h-[72svh] w-full sm:h-[78svh] md:h-[85vh]" src="https://www.youtube.com/embed/WeYXY4l22ZU?si=SCfrrai8Bh-raFgq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
				</div>
			</div>
		</main>
	);
}
