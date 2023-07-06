import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import { getStoresByUserId } from "@/actions";

interface NavbarProps {}

const Navbar = async ({}: NavbarProps) => {
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const stores = await getStoresByUserId(userId);

	return (
		<nav className="border-b">
			<div className="h-16 flex items-center px-4">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
