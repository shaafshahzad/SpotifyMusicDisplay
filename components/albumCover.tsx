import React from "react";
import { useOrientation } from "@/lib/hooks/useOrientation";

const AlbumCover = ({ imageUrl }: { imageUrl: string }) => {
	const orientation = useOrientation();

	return (
		<img
			src={imageUrl}
			alt="Album Art"
			className={`mb-6 rounded-xl shadow-2xl aspect-square ${
				orientation === "landscape" ? "w-[30%]" : "h-[30%]"
			}`}
		/>
	);
};

export default AlbumCover;
