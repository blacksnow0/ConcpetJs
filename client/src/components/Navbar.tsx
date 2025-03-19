import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-neutral-100 text-neutral-700 p-4">
      <div className="flex w-full justify-between mx-auto items-center">
        <Link to="/" className="text-xl font-mono font-medium">
          ConceptJs
        </Link>

        <div className="space-x-4 font-mono tracking-wide">
          <Link to="/" className="hover:underline text-xs font-semibold">
            HOME
          </Link>
          <Link to="/profile" className="hover:underline text-xs font-semibold">
            PROFILE
          </Link>
        </div>
      </div>
    </nav>
  );
}
