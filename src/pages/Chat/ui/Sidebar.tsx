export function Sidebar() {
  return (
    <nav className="bg-[#211636] shadow-lg h-screen fixed top-0 right-0 min-w-[270px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto">
      <div className="flex flex-wrap items-center cursor-pointer">
        <div className="relative">
          <img
            src="https://readymadeui.com/profile_2.webp"
            className="w-12 h-12 p-1 rounded-full border-2 border-gray-300"
          />
          <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
        </div>
        <div className="ml-6">
          <p className="text-xs text-gray-300">Hello</p>
          <h6 className="text-base text-white">John Doe</h6>
        </div>
      </div>
      <hr className="border-gray-500 mt-8" />
      <div className="my-8 flex-1">
        <h6 className="text-sm text-white inline-block">Teams</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          className="w-[15px] h-[15px] float-right cursor-pointer ml-auto"
          viewBox="0 0 118.783 118.783"
        >
          <path
            d="M115.97 101.597 88.661 74.286a47.75 47.75 0 0 0 7.333-25.488c0-26.509-21.49-47.996-47.998-47.996S0 22.289 0 48.798c0 26.51 21.487 47.995 47.996 47.995a47.776 47.776 0 0 0 27.414-8.605l26.984 26.986a9.574 9.574 0 0 0 6.788 2.806 9.58 9.58 0 0 0 6.791-2.806 9.602 9.602 0 0 0-.003-13.577zM47.996 81.243c-17.917 0-32.443-14.525-32.443-32.443s14.526-32.444 32.443-32.444c17.918 0 32.443 14.526 32.443 32.444S65.914 81.243 47.996 81.243z"
            data-original="#000000"
          />
        </svg>
        <ul className="mt-6 space-y-6">
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/profile_3.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
            </span>
            Peter Taylor
            <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center text-white text-[11px] font-bold rounded-full ml-auto">
              1
            </span>
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/profile_4.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
            </span>
            Johne Words
            <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center text-white text-[11px] font-bold rounded-full ml-auto">
              5
            </span>
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/profile_5.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0" />
            </span>
            Alen Walwa
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/profile.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
            </span>
            Justin
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/team-1.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0" />
            </span>
            Mark Adele
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/team-2.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
            </span>
            Ammie Kolhe
            <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center text-white text-[11px] font-bold rounded-full ml-auto">
              2
            </span>
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/team-3.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0" />
            </span>
            Piterson
          </li>
          <li className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
            <span className="relative inline-block mr-4">
              <img
                src="https://readymadeui.com/team-4.webp"
                className="w-10 h-10 p-1 rounded-full border-2 border-gray-300"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0" />
            </span>
            Angue Watson
          </li>
        </ul>
      </div>
    </nav>
  );
}
