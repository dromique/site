import { withBasePath } from "@/app/lib/with-base-path";

export default function CvPage() {
	return (
		<main className="min-h-screen bg-[#F7EDE1] px-4 py-20 sm:px-6 md:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg">
					{/* Embed video in page */}
					<iframe
						src={withBasePath("/video/flight of the Silverbird.mp4")}
						title="Het live optreden van Flight of the Silverbird op 31 mei 2026"
						className="h-[72svh] w-full sm:h-[78svh] md:h-[85vh]"
					/>
				</div>
			</div>
		</main>
	);
}
