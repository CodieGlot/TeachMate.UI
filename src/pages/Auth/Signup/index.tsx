import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services";
import { UserRole } from "../../../common/enums";
import { AxiosError } from "../../../interfaces";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState(UserRole.LEARNER);
  const [error, setError] = useState<AxiosError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole(Number(event.target.value) as UserRole);
  };

  const handleSignup = async () => {
    try {
        const { accessToken, user } = await AuthService.signup({
            username,
            password,
            confirmPassword,
            userRole,
        });

        if (user.userRole === UserRole.TUTOR) {
            navigate('/add-tutor-detail', {
                state: { accessToken, user }
            });
        } else if (user.userRole === UserRole.LEARNER) {
            navigate('/add-learner-detail', {
                state: { accessToken, user }
            });
        }

    } catch (err) {
        console.error("Signup failed:", err);
        const error = err as AxiosError;
        setError(error);

        // Handle specific error messages
        if (password !== confirmPassword) {
            setMessage("Password confirmation failed. Please ensure both passwords match.");
        } else if (password.length < 5 || password.length > 15) {
            setMessage("Password must be between 5 and 15 characters in length.");
        } else if (username.length < 5 || username.length > 15) {
            setMessage("Username must be between 5 and 15 characters in length.");
        } else if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
        } else {
            setMessage("An unexpected error occurred during signup.");
        }
    }
};

  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center md:p-8 p-6 bg-gradient-to-r from-sky-400/1 to-indigo-600/2 h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
                Create an account
              </h3>
            </div>
            <div>
              <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg-50">Username</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full bg-transparent text-black border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx={10} cy={7} r={6} data-original="#000000" />
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-transparent text-gray-400 text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  name="confirm-password"
                  type="password"
                  required
                  className="w-full bg-transparent text-gray-400 text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-around gap-10 mt-10 items-center">
              <div className="">
                <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg">Role</label>
                <div className="flex items-center mb-4">
                  <input
                    defaultChecked
                    id="default-radio-1"
                    type="radio"
                    value={UserRole.LEARNER}
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleRoleChange}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-white dark:border-gray-400"
                  >
                    Learner
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value={UserRole.TUTOR}
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleRoleChange}
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-400 dark:text-white dark:border-gray-400"
                  >
                    Tutor
                  </label>
                </div>
              </div>

              <div className="flex p-4 text-sm text-gray-400 rounded-lg bg-gradient-to-r from-sky-400/20 to-indigo-600/20 h-full lg:w-11/12 lg:ml-auto" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Ensure that these requirements are met:</span>
                  <ul className="mt-1.5 list-disc list-inside">
                    <li>At least 5 characters (and up to 15 characters)</li>
                    <li>At least one lowercase character</li>
                    <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="button"
                onClick={handleSignup}
                className="relative w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-gradient-to-r from-sky-400 to-indigo-600 text-transparent border-transparent bg-clip-border before:absolute before:inset-0 before:rounded-md before:bg-white before:bg-gradient-to-r before:from-sky-400 before:to-indigo-600 before:p-[1px] before:-z-10 before:content-['']"
              >
                <span className="bg-clip-text text-transparent text-white dark:text-white">
                  Register
                </span>
              </button>

              <p className="text-red-400 p-5 bg-white font-medium text-sm text-red-500">{message}</p>

              <p className="font-semibold ml-1 hover:underline text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="font-semibold ml-1 hover:underline text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
