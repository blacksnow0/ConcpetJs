import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-orange-500 via-orange-200 via-neutral-100 to-neutral-600    p-6">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="bg-white/50 z-10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md text-center text-neutral-700">
        {/* Avatar */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-white/30 text-3xl font-semibold shadow-md">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold mt-4">Welcome, {user?.username}!</h1>
        <p className="text-black/80 text-sm">{user?.email}</p>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 cursor-pointer w-full bg-red-500 hover:bg-red-600 transition-all text-white font-semibold py-2 px-4 rounded-xl shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
