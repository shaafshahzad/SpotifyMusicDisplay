import React from "react";
import { useOrientation } from "@/lib/hooks/useOrientation";

interface AlbumCoverProps {
	imageUrl: string;
	isPlaying: boolean;
}

const AlbumCover = ({ imageUrl, isPlaying }: AlbumCoverProps) => {
	const orientation = useOrientation();
	const animationClass = isPlaying
		? "transition-transform duration-500 ease-in-out scale-100"
		: "transition-transform duration-500 ease-in-out scale-[0.8]";

	return (
		<img
			src={imageUrl}
			alt="Album Art"
			className={`mb-6 rounded-xl shadow-2xl aspect-square ${animationClass} ${
				orientation === "landscape" ? "w-[30%]" : "h-[30%]"
			}`}
		/>
	);
};

export default AlbumCover;
