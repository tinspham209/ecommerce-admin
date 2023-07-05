import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

export const font = Roboto({
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

export const metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={font.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
