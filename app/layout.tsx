import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Music Display for Spotify",
	description: "Harmonic visuals to elevate your space",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			className="h-full overflow-hidden"
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${inter.className} h-full flex`}>{children}</body>
		</html>
	);
}
