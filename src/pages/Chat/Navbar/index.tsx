import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../../config";
import logo from "../../../assets/react.svg";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await firebaseAuth.signOut();
    navigate("/chat");
  };

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4"
      data-twe-navbar-ref=""
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* Other navigation items can be added here */}

        {/* Logo */}
        <a href="/" className="flex items-center text-black dark:text-white">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-lg font-bold">TeachMate Connect</span>
        </a>

        {/* Avatar */}
        <div className="relative ms-auto" data-twe-dropdown-ref="">
          <button
            className="flex items-center whitespace-nowrap text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
            onClick={toggleDropdown}
            id="navbarDropdownMenuLink"
            aria-expanded={isDropdownOpen}
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
              className="rounded-full"
              style={{ height: 33, width: 33 }}
              alt="Avatar"
              loading="lazy"
            />
            <span className="ps-1 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isDropdownOpen && (
            <ul
              className="absolute right-0 mt-2 z-[1000] min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <button className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25">
                  My profile
                </button>
              </li>
              <li>
                <button className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25">
                  Settings
                </button>
              </li>
              <li>
                <button
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
