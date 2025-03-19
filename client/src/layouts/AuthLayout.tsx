import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section (60%) */}
      <div className="w-3/5 flex items-center justify-center shadow-md">
        <div className="p-6 w-full max-w-[365px] rounded-md">
          <h1 className="text-3xl font-mono font-bold text-center mb-6 text-neutral-800 text-white">
            ConceptsJs
          </h1>
          <Outlet />
        </div>
      </div>

      {/* Right Section (40%) with Gradient */}
      <div
        className="relative w-2/5 flex flex-col items-center justify-center
        bg-gradient-to-br from-orange-500 via-orange-200 via-neutral-100 to-neutral-600"
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <h2 className="text-neutral-200 text-2xl font-bold z-10 drop-shadow ">
          I love sleep its my favorite!
        </h2>
        <p className="absolute bottom-14 text-neutral-200 z-10 text-sm font-semibold tracking">
          Made with Vite, React, Tailwind and Express!
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
