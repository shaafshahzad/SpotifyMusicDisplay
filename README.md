# SpotifyMusicDisplay

<div align="center">
    <img src="https://github.com/shaafshahzad/SpotifyMusicDisplay/blob/main/public/landing.png?raw=true" alt="DeepEnd example timeline" width="1000"/>
    <img src="https://github.com/shaafshahzad/SpotifyMusicDisplay/blob/main/public/preview.png?raw=true" alt="DeepEnd example timeline" width="1000"/>
</div>

## Introduction

SpotifyMusicDisplay is a web application that provides a visual display for currently playing Spotify songs. It showcases the users currently playing song details alongside a moving gradient background that syncs with the song cover.

## Key Features

- **Real-Time Display**: Shows the currently playing song on Spotify in real-time.
- **User-Friendly Interface**: Clean and intuitive interface designed for ease of use.
- **Responsive Design**: Fully responsive design that works on various devices.

## Technology Stack

- TypeScript
- Next.js
- TailwindCSS
- Spotify API

## Next Steps

Future enhancements include using a less intensive WebGL background and additional user experience changes.

## Local Development

### Prerequisites

- Node.js
- npm

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shaafshahzad/SpotifyMusicDisplay.git
   ```
2. **Change directory**:
   ```bash
   cd SpotifyMusicDisplay
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Environment Variables**:
   Create a `.env.local` file in the root directory with your Spotify API credentials.
   ```dotenv
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=your_spotify_redirect_uri
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   SPOTIFY_ACCESS_TOKEN=your_spotify_access_token
   ```
5. **Start the local development server**:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request
