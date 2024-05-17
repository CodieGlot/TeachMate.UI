export function Pricing() {
  return (
    <div className="font-[sans-serif] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-[#333]">
            Choose a Subscription
          </h2>
          <p className="text-sm text-gray-500">
            choose a plan tailored to your needs
          </p>
        </div>
        <div className="flex mx-auto mt-12 bg-gray-100 rounded-xl max-w-[200px] relative">
          <button className="font-semibold w-full text-sm bg-gray-800 py-3 px-4 rounded-xl">
            Monthly
          </button>
          <button className="text-gray-400 font-semibold w-full text-sm py-3 px-4 rounded-xl">
            Yearly
          </button>
          <span className="absolute right-0 -bottom-5 text-xs font-bold">
            (Save 20%)
          </span>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-12 max-sm:max-w-sm max-sm:mx-auto">
          <div className="bg-gray-800 rounded-3xl p-6">
            <h4 className="text-lg mb-2">Basic</h4>
            <h3 className="text-4xl font-semibold ">
              $4.50<sub className="text-gray-300 text-sm ml-2">/ month</sub>
            </h3>
            <hr className="mt-4" />
            <div className="mt-10">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  50 Image generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  500 Credits
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Monthly 100 Credits Free
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Customer Support
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Dedicated Server
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Priority Generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  50GB Cloud Storage
                </li>
              </ul>
              <button
                type="button"
                className="w-full mt-10 px-2 py-2 text-sm  border hover:border-orange-500 bg-transparent rounded-xl"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-3xl p-6">
            <h4 className="text-lg  mb-2">Startup</h4>
            <h3 className="text-4xl font-semibold ">
              $14.50<sub className="text-gray-300 text-sm ml-2">/ month</sub>
            </h3>
            <hr className="mt-4" />
            <div className="mt-10">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  200 Image generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  1200 Credits
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Monthly 1000 Credits Free
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Customer Support
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Dedicated Server
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Priority Generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  150GB Cloud Storage
                </li>
              </ul>
              <button
                type="button"
                className="w-full mt-10 px-2 py-2 text-sm  border hover:border-orange-500 bg-transparent rounded-xl"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-3xl p-6">
            <h4 className="text-lg  mb-2">Enterprise</h4>
            <h3 className="text-4xl font-semibold ">
              $24.50<sub className="text-gray-300 text-sm ml-2">/ month</sub>
            </h3>
            <hr className="mt-4" />
            <div className="mt-10">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  400 Image generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  2000 Credits
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Monthly 1500 Credits Free
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Customer Support
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Dedicated Server
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Priority Generations
                </li>
                <li className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    className="mr-4 bg-white fill-green-500 rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  500GB Cloud Storage
                </li>
              </ul>
              <button
                type="button"
                className="w-full mt-10 px-2 py-2 text-sm  border hover:border-orange-500 bg-transparent rounded-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
