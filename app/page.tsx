"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { images } from "../lib/utils/images";

const shuffleArray = (
  array: { imageUrl: string; altText: string }[]
): { imageUrl: string; altText: string }[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Landing = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const shuffledImages = shuffleArray([...images]);
  const images1 = shuffledImages.slice(
    0,
    Math.floor(shuffledImages.length / 2)
  );
  const images2 = shuffledImages.slice(Math.floor(shuffledImages.length / 2));

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      router.push("/api/auth");
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    window.location.href =
      "https://github.com/shaafshahzad/SpotifyMusicDisplay";
  };

  return (
    <main className="w-full h-full landing-bg flex flex-col items-center">
      <Navbar handleLogin={handleLogin} />
      <div className="h-full w-full items-center p-12 flex">
        <div className="w-full lg:w-[30%] text-[#141414] space-y-8 pr-10">
          <div className="flex items-center text-xs font-bold">
            <p className="border border-gray-300 rounded-full px-4 py-2">
              {"What's new"}
            </p>
            <p className="font-semibold flex items-center px-4 py-2">
              Launched v1.0 <ChevronRight size={18} />
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold">
              Harmonic Visuals to Elevate Your Space
            </h1>
            <p className="text-md font-light">
              Immerse yourself in an environment where each beat and melody of
              your favorite Spotify tracks is visually brought to life,
              transforming your space into a canvas of musical expression.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLogin}
              className="bg-green-500 font-semibold text-white px-4 py-2 mt-4 rounded-md flex justify-center items-center gap-1"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Authenticate"}
              <Image
                width={300}
                height={300}
                alt="Spotify Logo"
                src="/spotifylogo.png"
                className="w-8"
              />
            </button>
            <button
              onClick={handleRedirect}
              className="flex items-center px-4 py-2 mt-4 gap-1 hover:underline"
            >
              Learn more <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
        <div className="w-0 invisible lg:visible lg:w-[70%] aspect-video h-full">
          <div className="h-1/2">
            <InfiniteMovingCards
              items={images1}
              direction="right"
              speed="slow"
            />
          </div>
          <div className="h-1/2">
            <InfiniteMovingCards
              items={images2}
              direction="right"
              speed="slow"
              className="pr-[50%]"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
