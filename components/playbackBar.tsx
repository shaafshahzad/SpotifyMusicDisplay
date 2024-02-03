import React from "react";
import { useOrientation } from "@/lib/hooks/useOrientation";
import { formatTime } from "@/lib/utils/formatTime";
import { PlayCircle, PauseCircle } from "lucide-react";

interface PlaybackBarProps {
	progress: number;
	elapsed: number;
	duration: number;
	isPlaying: boolean;
}

const PlaybackBar = ({
	progress,
	elapsed,
	duration,
	isPlaying,
}: PlaybackBarProps) => {
	const orientation = useOrientation();
	const timeLeft = duration - elapsed;
	const formattedElapsed = formatTime(elapsed);
	const formattedTimeLeft = `-${formatTime(timeLeft)}`;

	return (
		<div
			className={`flex flex-col ${
				orientation === "landscape" ? "w-[29%]" : "w-[50%]"
			}`}
		>
			<div className="flex justify-between w-full mb-3 text-sm text-white opacity-50">
				<p className="w-[40px]">{formattedElapsed}</p>
				<div className="relative w-10 flex justify-center items-center">
					<PlayCircle
						className={`absolute transition-opacity duration-300 ease-in-out ${
							isPlaying ? "opacity-100" : "opacity-0"
						}`}
					/>
					<PauseCircle
						className={`absolute transition-opacity duration-300 ease-in-out ${
							isPlaying ? "opacity-0" : "opacity-100"
						}`}
					/>
				</div>{" "}
				<p className="w-[40px]">{formattedTimeLeft}</p>
			</div>
			<div className="bg-gray-500 rounded-full h-1.5 mb-4">
				<div
					className="bg-gray-100 h-1.5 rounded-full"
					style={{ width: `${progress}%` }}
				></div>
			</div>
		</div>
	);
};

export default PlaybackBar;
