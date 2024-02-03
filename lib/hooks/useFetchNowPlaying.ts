import { useEffect, useState } from 'react';
import { getNowPlaying } from '@/lib/services/spotify';
import { getColors } from '@/lib/utils/getColors';
import { rgbToHex } from '@/lib/utils/rgbToHex';

export const useFetchNowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState({
        album: "",
        albumImageUrl: "",
        artist: "",
        isPlaying: false,
        songUrl: "",
        title: "",
        progress: 0,
        duration: 0,
    });
    const [colors, setColors] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('stopped');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNowPlaying();

                console.log("raw response", response)

                if (!response || !response.item) {
                    setStatus('stopped');
                    return;
                }

                setStatus('playing');

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
                        progress: response.progress_ms,
                        duration: response.item.duration_ms,
                    };
                    setNowPlaying(nowPlayingData);

                    if (nowPlayingData.progress && nowPlayingData.duration) {
                        const newProgress =
                            (nowPlayingData.progress / nowPlayingData.duration) * 100;
                        setProgress(newProgress);
                    }

                    if (nowPlayingData.albumImageUrl) {
                        getColors(nowPlayingData.albumImageUrl)
                            .then((rgbColors) => {
                                if (rgbColors) {
                                    const hexColors = rgbColors.map(rgbToHex);
                                    setColors(hexColors.filter((color) => color !== null) as string[]);
                                } else {
                                    console.error("Failed to extract color palette from image");
                                }
                            })
                            .catch(console.error);
                    }
                }
            } catch (error) {
                console.error("Error fetching now playing:", error);
                setColors([
                    "#247BA0",
                    "#09BC8A",
                    "#EF767A",
                    "#523249",
                ])
                setStatus('stopped');
            }
        };

        fetchData();
        const pollingInterval = setInterval(fetchData, 1000);

        return () => clearInterval(pollingInterval);
    }, []);

    return { nowPlaying, progress, colors, status };
};
