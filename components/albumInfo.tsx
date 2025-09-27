import React from "react";

interface AlbumInfoProps {
	title: string;
	artist: string;
	album: string;
}

const AlbumInfo = ({ title, artist, album }: AlbumInfoProps) => {
	return (
		<>
			<p className=" text-white font-medium text-sm sm:text-xl">{title}</p>
			<p className="text-white text-center text-opacity-50 font-medium text-sm sm:text-lg">
				{artist} - {album}
			</p>
		</>
	);
};

export default AlbumInfo;
