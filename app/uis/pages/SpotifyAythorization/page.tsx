"use client";
const SpotifyAuthorization: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login"; // backend login route
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center font-semibold gap-4">
      <h1 className="text-xl">Log in</h1>
      <button
        className="text-white bg-[#1ED760] hover:scale(0.2) px-[35px] py-[17px] rounded-[32px] w-contain"
        onClick={handleLogin}
      >
        Log in to Spotify
      </button>
    </div>
  );
};
export default SpotifyAuthorization;
