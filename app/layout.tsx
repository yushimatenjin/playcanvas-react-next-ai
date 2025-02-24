import "./globals.css";

export const metadata = {
	title: "PlayCanvas React Next.js",
	description: "PlayCanvas React Next.js Demo",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="ja" className="m-0 p-0">
			<body className="m-0 p-0">
				<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background-start/80 border-b border-overlay-light">
					<nav className="max-w-7xl mx-auto px-4 py-4">
						<div className="flex items-center justify-between gap-6 text-sm">
							<div className="flex items-center gap-6">
								<a
									href="./glb-viewer"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">GLB Viewer</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
								<a
									href="./splat-viewer"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">Splat Viewer</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
								<a
									href="./motion"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">Motion</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
								<a
									href="./physics"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">Physics</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
								<a
									href="./explode"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">Explode</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
								<a
									href="./multiple-canvas"
									className="text-text-primary hover:text-accent-secondary transition-all duration-300 px-3 py-2 relative interactive-element group"
								>
									<span className="relative z-10">Multiple Canvas</span>
									<span className="absolute inset-0 bg-overlay-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
								</a>
							</div>
						</div>
					</nav>
				</header>
				<div className="pt-16">{children}</div>
			</body>
		</html>
	);
}
