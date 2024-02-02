"use server";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
const basic = btoa(`${client_id}:${client_secret}`);

const getAccessToken = async () => {
    if (!refresh_token) {
        throw new Error("Refresh token must be set");
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token
      })
    });
  
    const responseData = await response.json();

    return responseData;
  };

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

    const responseData = await response.json();
    
    if (!response.ok) {
        const errorDetails = await response.text(); // Get more details about the error
        console.error('Error fetching now playing:', errorDetails);
        throw new Error(`Network response was not ok. Status: ${response.status}, Details: ${errorDetails}`);
    }
  

    return responseData;
  
};