import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthService } from "../../../services";
import { UserRole } from "../../../common/enums";
import { AxiosError } from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { ApiValidationException } from "../../../interfaces";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const showToast = () => toast.success("Here is a basic toast message.");

  const handleLogin = async () => {
    try {
      await AuthService.login({ username, password });
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);

      const error = err as AxiosError;
      const data = error.response?.data as ApiValidationException;

      Object.values(data.errors).forEach((errMsgList) => {
        errMsgList.forEach((errMsg) => {
          toast.error(errMsg);
        });
      });

      setError(error);

      // Handle specific error messages
      if (password.length < 5 || password.length > 15) {
        setMessage("Password must be between 5 and 15 characters in length.");
      } else if (username.length < 5 || username.length > 15) {
        setMessage("Username must be between 5 and 15 characters in length.");
      } else if (
        error.response &&
        error.response.data &&
        (error.response.data as any).message
      ) {
        setMessage((error.response.data as any).message);
      } else {
        setMessage("An unexpected error occurred during log in.");
      }
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (credential) {
      await AuthService.googleLogin(credential, UserRole.LEARNER);
      navigate("/");
    }
  };

  return (
    <div data-aos="zoom-in-left" data-aos-duration="1000">
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form>
                <div className="mb-12">
                  <button onClick={showToast}>Basic toast message</button>
                  <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600">
                    Sign in
                  </h3>
                  <p className="text-sm mt-4 ">
                    Don't have an account{" "}
                    <a
                      href="/auth/signup"
                      className="font-semibold hover:underline ml-1 whitespace-nowrap bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent"
                    >
                      Register here
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg">
                    Username or Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter username or email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit={10}
                          strokeWidth={40}
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        />
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-xs block mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600 text-lg">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
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
                <div className="flex items-center justify-between gap-2 mt-5">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a
                      href="/auth/SendOTP"
                      className="font-semibold text-sm hover:underline bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <p className="text-red-400 p-5 bg-white font-medium text-sm text-red-500">
                  {message}
                </p>

                <div className="mt-12">
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-gradient-to-r to-indigo-600 from-sky-400 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <p className="my-8 text-sm text-gray-400 text-center">
                  or continue with
                </p>
                <div className="space-x-8 flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Login with Google Failed");
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="md:h-full max-md:mt-10  rounded-xl ">
              <img
                src="/src/assets/login-bg.png"
                className="w-full h-full object-contain"
                alt="login-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
