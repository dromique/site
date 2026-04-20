import { withBasePath } from "@/app/lib/with-base-path";

export default function CvPage() {
	return (
		<main className="min-h-screen bg-[#F7EDE1] px-4 py-20 sm:px-6 md:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg">
					<iframe
						src={withBasePath("/cv.pdf")}
						title="CV PDF"
						className="h-[72svh] w-full sm:h-[78svh] md:h-[85vh]"
					/>
				</div>
				<div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
					<a
						href={withBasePath("/cv.pdf")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center rounded-lg bg-[#C26E4B] px-5 py-3 text-center font-lora text-[#F7EDE1] transition-colors hover:bg-[#a85e41]"
					>
						Open pdf
					</a>
				</div>
			</div>
		</main>
	);
}
