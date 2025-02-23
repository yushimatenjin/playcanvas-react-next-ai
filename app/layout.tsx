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
        <header className="p-4 bg-[#333] text-white">
          <nav className="flex items-center gap-6">
            <a
              href="./glb-viewer"
              className="hover:text-gray-300 transition-colors duration-200 px-3 py-2"
            >
              GLB Viewer
            </a>
            <a
              href="./splat-viewer"
              className="hover:text-gray-300 transition-colors duration-200 px-3 py-2"
            >
              Splat Viewer
            </a>
            <a
              href="./motion"
              className="hover:text-gray-300 transition-colors duration-200 px-3 py-2"
            >
              Motion
            </a>
            <a
              href="./physics"
              className="hover:text-gray-300 transition-colors duration-200 px-3 py-2"
            >
              Physics
            </a>
            <a
              href="./explode"
              className="hover:text-gray-300 transition-colors duration-200 px-3 py-2"
            >
              Explode
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
