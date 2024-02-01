"use client";

import React, { useEffect, useState } from "react";
import { getNowPlaying } from "@/lib/spotify";
import { getColors } from "@/lib/get-colors";
import { Gradient } from "@/Gradient.js";
import { rgbToHex } from "@/lib/rgb-to-hex";

type NowPlayingSong = {
	album: string;
	albumImageUrl: string;
	artist: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
};

const Player = () => {
	const [nowPlaying, setNowPlaying] = useState<NowPlayingSong>({
		album: "",
		albumImageUrl: "",
		artist: "",
		isPlaying: false,
		songUrl: "",
		title: "",
	});
	const [colors, setColors] = useState<string[]>([]);
	const gradient: any = new Gradient();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getNowPlaying();
				if (response && response.item) {
					const nowPlayingData = {
						album: response.item.album.name,
						albumImageUrl: response.item.album.images[0].url,
						artist: response.item.artists
							.map((artist: { name: string }) => artist.name)
							.join(", "),
						isPlaying: response.is_playing,
						songUrl: response.item.external_urls.spotify,
						title: response.item.name,
					};
					setNowPlaying(nowPlayingData);

					if (nowPlayingData.albumImageUrl) {
						getColors(nowPlayingData.albumImageUrl)
							.then((rgbColors) => {
								if (rgbColors) {
									const hexColors = rgbColors.map((color) =>
										rgbToHex(color)
									);
									setColors(
										hexColors.filter(
											(color) => color !== null
										) as string[]
									);
								} else {
									console.error(
										"Failed to extract color palette from image"
									);
								}
							})
							.catch(console.error);
					}
				}
			} catch (error) {
				console.error("Error fetching now playing:", error);
			}
		};

		fetchData();
		const pollingInterval = setInterval(fetchData, 1000);

		return () => clearInterval(pollingInterval);
	}, []);

	useEffect(() => {
		const canvasElement = document.getElementById("gradient-canvas");
		if (canvasElement) {
			gradient.initGradient("#gradient-canvas");
		} else {
			gradient.pause();
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		const maxColorVariables = 4;

		const arraysEqual = (a: string[], b: string[]) => {
			if (a === b) return true;
			if (a == null || b == null || a.length !== b.length) return false;

			for (var i = 0; i < a.length; ++i) {
				if (a[i] !== b[i]) return false;
			}
			return true;
		};

		if (
			!arraysEqual(
				colors,
				Array.from({ length: maxColorVariables }, (_, i) =>
					root.style
						.getPropertyValue(`--gradient-color-${i + 1}`)
						.trim()
				)
			)
		) {
			for (let i = 1; i <= maxColorVariables; i++) {
				root.style.removeProperty(`--gradient-color-${i}`);
			}

			colors.forEach((color, index) => {
				root.style.setProperty(`--gradient-color-${index + 1}`, color);
			});

			const canvasElement = document.getElementById("gradient-canvas");
			if (canvasElement) {
				gradient.initGradient("#gradient-canvas");
			}
		}
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
						<img src={nowPlaying.albumImageUrl} alt="Album Art" />
						<h3>{nowPlaying.title}</h3>
						<p>{nowPlaying.artist}</p>
						<p>{nowPlaying.album}</p>
					</>
				) : (
					<p>Nothing Playing</p>
				)}
			</div>
		</>
	);
};

export default Player;
