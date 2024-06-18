import { ChangeEvent, useState } from "react";
import { AuthService } from "../../../services";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export function ChangePassword() {
    const [new_Password, setNewPassword] = useState('');
    const [confirm_Password, setConfirmPassword] = useState('');
    const [old_Password, setOldPassword] = useState('');
    const navigate = useNavigate();
    const accessToken = AuthService.getAccessToken();
    const handleInputChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };
    const handleInputChangeconfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
    const handleInputOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value);
    };
    const location = useLocation();
    const [error, setError] = useState<AxiosError | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { state } = location;
    const handleSaveClick = async () => {
        try {


            await AuthService.ChangePassword({
                old_Password,
                new_Password,
                confirm_Password
            }, accessToken)
            navigate("/")


        } catch (err) {
            console.error("Change Fail", err)
            const error = err as AxiosError;
            setError(error);
            if (error.response && error.response.data && (error.response.data as any).message) {
                setMessage((error.response.data as any).message);
            } else {
                setMessage("An unexpected error occurred during log in.");
            }
        }


    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                            <input value={old_Password}
                                onChange={handleInputOldPassword} type="password" name="oldpassword" id="oldpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input value={new_Password}
                                onChange={handleInputChangePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input value={confirm_Password}
                                onChange={handleInputChangeconfirmPassword} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <p className="text-sm text-red-500 p-4 text-center">
                            {message}
                        </p>
                        <button onClick={handleSaveClick} type="button" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border">Change password</button>
                    </form>
                </div>
            </div>
        </section>

    );
}