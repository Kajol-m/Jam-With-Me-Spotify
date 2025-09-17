"use client";
import { useEffect, useState } from "react";

interface SpotifyProfile {
  display_name: string;
  email: string;
  country: string;
  images?: { url: string }[];
}

const SpotifyMain: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);

  // 1. Extract access_token from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    console.log(token);
    if (token) {
      setAccessToken(token);
      // clean up URL (so token isn't visible)
      window.history.replaceState({}, document.title, "/uis/pages/main");
    }
  }, []);

  // 2. Fetch user profile if token exists
  useEffect(() => {
    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [accessToken]);

  if (!accessToken) {
    return <p className="text-center mt-20">Redirecting to Spotify login...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {profile ? (
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md w-80 text-center">
          {profile.images && profile.images.length > 0 && (
            <img
              src={profile.images[0].url}
              alt="Spotify Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <h1 className="text-xl font-bold">{profile.display_name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-500 text-sm">Country: {profile.country}</p>
        </div>
      ) : (
        <p>Loading Spotify profile...</p>
      )}
    </div>
  );
};

export default SpotifyMain;
