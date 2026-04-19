export default function CvPage() {
	return (
		<main className="min-h-screen bg-[#F7EDE1] px-6 py-8 md:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg">
					<iframe
						src="/cv.pdf"
						title="CV PDF"
						className="h-[85vh] w-full"
					/>
				</div>
                <div className="flex items-center justify-between gap-4">
					<a
						href="/cv.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-lg bg-[#C26E4B] px-5 py-3 font-lora text-[#F7EDE1] transition-colors hover:bg-[#a85e41]"
					>
						Open pdf
					</a>
				</div>
			</div>
		</main>
	);
}
