import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

const Navbar = () => {
  return (
    <nav
    className="bg-nav-bg text-nav-text border-e-1 border-nav-bg-secondary w-60 h-dvh px-10"
    >
      <div className="flex flex-col items-start justify-start h-dvh py-30 text-2xl gap-10">

        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <FaHome />
            <h1>Home</h1>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <FaSearch />
            <h1>Search</h1>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <MdExplore />
            <h1>Explore</h1>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <MdExplore />
            <h1>Explore</h1>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <MdExplore />
            <h1>Explore</h1>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex flex-row gap-3 items-baseline py-5">
            <MdExplore />
            <h1>Explore</h1>
          </div>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
