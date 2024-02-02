import React from "react";
import { useOrientation } from "@/lib/hooks/useOrientation";

const PlaybackBar = ({ progress }: { progress: number }) => {
	const orientation = useOrientation();

	return (
		<div
			className={`bg-gray-500 rounded-full h-1.5 mb-4 ${
				orientation === "landscape" ? "w-[30%]" : "w-[50%]"
			}`}
		>
			<div
				className="bg-gray-100 h-1.5 rounded-full"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default PlaybackBar;
