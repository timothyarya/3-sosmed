import Link from "next/link";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="bg-nav-bg text-nav-text border-e-1 border-nav-bg-secondary w-70 h-dvh overflow-hidden">
      <div className="flex flex-col items-center justify-between h-dvh py-10">
        <div className="nav-brand ">
          <h1 className="font-bold text-2xl antialiased">
            Twitter
          </h1>
        </div>
          
        <div className="flex flex-col gap-4">
 
            <Link href={"/"}>
              Home
            </Link>
            <Link href={"/"}>
              Search
            </Link>
            <Link href={"/"}>
              Explore
            </Link>
            <Link href={"/"}>
              Message
            </Link>
            <Link href={"/"}>
              Create
            </Link>
         
        </div>
        <div className="flex flex-col gap-4">
 
            <Link href={"/"}>
              Profile
            </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
