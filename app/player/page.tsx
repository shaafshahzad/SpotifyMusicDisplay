"use client";

import React, { useEffect } from "react";
import { useFetchNowPlaying } from "@/lib/hooks/useFetchNowPlaying";
import { useGradient } from "@/lib/hooks/useGradient";
import { updateGradient } from "@/lib/utils/updateCssVariables";
import AlbumCover from "@/components/albumCover";
import AlbumInfo from "@/components/albumInfo";
import PlaybackBar from "@/components/playbackBar";

const Player = () => {
	const { nowPlaying, progress, colors, status } = useFetchNowPlaying();

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
				{status === "playing" ? (
					<>
						<AlbumCover
							imageUrl={nowPlaying.albumImageUrl}
							isPlaying={nowPlaying.isPlaying}
						/>
						<div className="w-full flex flex-col items-center text-xl">
							<PlaybackBar
								progress={progress}
								elapsed={nowPlaying.progress}
								duration={nowPlaying.duration}
								isPlaying={nowPlaying.isPlaying}
							/>
							<AlbumInfo
								title={nowPlaying.title}
								artist={nowPlaying.artist}
								album={nowPlaying.album}
							/>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center gap-2 text-white">
						<p className="text-4xl">No music is playing</p>
						<p className="text-xl">
							Start playing music on your Spotify account
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Player;
