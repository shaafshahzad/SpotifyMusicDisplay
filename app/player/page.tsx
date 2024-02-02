"use client";

import React, { useEffect } from "react";
import { useFetchNowPlaying } from "@/lib/hooks/useFetchNowPlaying";
import { useGradient } from "@/lib/hooks/useGradient";
import { updateGradient } from "@/lib/utils/updateCssVariables";
import AlbumCover from "@/components/albumCover";
import AlbumInfo from "@/components/albumInfo";
import PlaybackBar from "@/components/playbackBar";

const Player = () => {
	const { nowPlaying, progress, colors } = useFetchNowPlaying();
	useGradient("gradient-canvas", colors);

	useEffect(() => {
		updateGradient(colors);
	}, [colors]);

	return (
		<>
			<canvas
				id="gradient-canvas"
				data-js-darken-top
				data-transition-in
			/>
			<div className="w-full h-full flex flex-col justify-center items-center fixed top-0.5">
				{nowPlaying.isPlaying ? (
					<>
						<AlbumCover imageUrl={nowPlaying.albumImageUrl} />
						<div className="w-full flex flex-col items-center text-3xl">
							<PlaybackBar
								progress={progress}
								elapsed={nowPlaying.progress}
								duration={nowPlaying.duration}
							/>
							<AlbumInfo
								title={nowPlaying.title}
								artist={nowPlaying.artist}
								album={nowPlaying.album}
							/>
						</div>
					</>
				) : (
					<p>Nothing Playing</p>
				)}
			</div>
		</>
	);
};

export default Player;
