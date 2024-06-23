import { ChangeEvent, useState } from "react";
import { SendOTPservice } from "../../../services/SendOTPservice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export function SendOTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [error, setError] = useState<AxiosError | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleSaveClick = async () => {

        try {

            await SendOTPservice.SendOTP({ email }
            )
            navigate("/auth/VerifyOTP", { state: { email } })

        } catch (err) {

            console.error("Send Fail", err)
            const error = err as AxiosError;
            setError(error);
            if (email == '') {
                setMessage("Please Enter your email");


            } else if (error.response && error.response.data && (error.response.data as any).message) {
                setMessage((error.response.data as any).message);
            } else {
                setMessage("An unexpected error occurred during log in.");
            }


        }
    }


    return (

        <main id="content" role="main" className="w-full max-w-md mx-auto p-6 mt-20">
            <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?
                            <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/auth/Login">
                                Login here
                            </a>
                        </p>
                    </div>

                    <div className="mt-5">
                        <form>
                            <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                    <div className="relative" >
                                        <input value={email}  // Bind input value to state variable
                                            onChange={handleInputChange}
                                            type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                    </div>
                                    <p className="text-sm text-red-500 p-4 text-center">
                                        {message}
                                    </p>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div>
                                <button onClick={handleSaveClick} type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Send OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </main>);
}