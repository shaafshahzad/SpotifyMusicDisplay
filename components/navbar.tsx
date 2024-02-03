import React from "react";
import { ArrowRightIcon, MusicIcon } from "lucide-react";

type NavbarProps = {
	handleLogin: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ handleLogin }) => {
	return (
		<div className="w-full max-h-20 h-full flex justify-between items-center px-10 text-[#141414]">
			<MusicIcon size={32} />
			<button
				className="flex items-center gap-1 font-semibold text-sm hover:underline"
				onClick={handleLogin}
			>
				Log in
				<ArrowRightIcon size={16} />
			</button>
		</div>
	);
};

export default Navbar;
