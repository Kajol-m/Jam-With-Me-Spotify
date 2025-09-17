"use client";
import { useEffect, useState } from "react";

interface SpotifyUser {
  display_name: string;
  email: string;
  id: string;
  images?: { url: string }[];
}

const SpotifyProfile: React.FC = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpotifyProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/uis/pages/main"); // your backend endpoint
        if (!res.ok) throw new Error("Failed to fetch Spotify data");

        const data = await res.json(); // backend should send back the Spotify user details
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchSpotifyProfile();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>Loading Spotify Profile...</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      {user.images && user.images.length > 0 && (
        <img
          src={user.images[0].url}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
      )}
      <h2 className="text-xl font-bold">{user.display_name}</h2>
      <p>Email: {user.email}</p>
      <p>Spotify ID: {user.id}</p>
    </div>
  );
};

export default SpotifyProfile;
