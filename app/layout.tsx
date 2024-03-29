import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
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
			<html lang="en" className={font.className}>
				<body className="min-h-screen">
					<QueryProvider>
						<ModalProvider />
						<Toaster />
						<main className="">{children}</main>
					</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
