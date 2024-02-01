import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";
import querystring from "querystring";

function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const state = generateRandomString(16);
    const scope = 'user-read-currently-playing';

    const queryString = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    });

    redirect(`https://accounts.spotify.com/authorize?${queryString}`);
}
