// import { useNavigate } from "react-router-dom";
import { User } from "./ui";


export function Header() {
  // const navigate = useNavigate();

 

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Resort Hub Logo</span>
            <img
             className="h-12 w-auto indigo-400"
              src="src/assets/Group.svg"
              alt=""
            />
          </a>
         
          <div>
            <form
              className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none ml-auto"
              style={{ marginLeft: '50px' }}
              
            >
              <input
                type="search"
                className="block w-full p-2.5 text-sm text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 ml-2"
                placeholder="Search . . ."
                required
              />
              <button
                type="submit"
                className="p-2.5 text-sm font-medium text-violet-400 bg-white border-solid border-2 border-violet-200 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                style={{ backgroundColor: 'bg-violet-400' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'bg-violet-400'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'bg-violet-400'}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19L13.65 13.65M11 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            id="openMobileNav"
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            href="/learning"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Learning
          </a>
          <a
            href="/search"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Search
          </a>
          <a
            href="/about-us"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About us
          </a>
          <a
            href={import.meta.env.VITE_TEACHMATE_CHATAPP_URL}
            className="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat
          </a>
        </div>
        <User />
      </nav>
      {/* Mobile navigation menu */}
      <div
        id="mobileNav"
        className="lg:hidden"
        role="dialog"
        aria-modal="true"
        style={{ display: "none" }}
      >
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto"
                src="../assets/images/logo.png"
                alt=""
              />
            </a>
            <button
              id="closeMobileNav"
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Product
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
