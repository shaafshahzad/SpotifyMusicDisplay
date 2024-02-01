import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import ColorThief from "colorthief";

export async function POST(request: Request) {
    const res = await request.json()
    const imageUrl = res.imageUrl;
    const colorThief = new ColorThief();


    console.log("res", res)
    console.log("imageUrl", imageUrl)

    if (!imageUrl) {
        console.error("No image URL provided");
        return NextResponse.json({ error: "No image URL provided" });
    }

    try {
        console.log("trying to get colors")
        console.log("imageUrl", imageUrl)  // Add this line
        const colors = colorThief.getPalette(imageUrl);
        console.log("colors", colors)
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error(error);  // Add this line
        return NextResponse.json({ error });
    }

}