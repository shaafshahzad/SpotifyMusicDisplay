import React from "react";

const PlaybackBar = ({ progress }: { progress: number }) => {
	return (
		<div className="w-[30%] bg-gray-500 rounded-full h-1.5 mb-4">
			<div
				className="bg-gray-100 h-1.5 rounded-full"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default PlaybackBar;
