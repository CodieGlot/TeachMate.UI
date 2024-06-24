import { ChangeEvent, useState, useEffect } from "react";
import { AuthService } from "../../../services";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FormikValues,
    FormikHelpers,
} from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
interface ChangeFormValues {
    old_Password: string;
    new_Password: string;
    confirm_Password: string;
}

export function ChangePassword() {

    const navigate = useNavigate();
    const accessToken = AuthService.getAccessToken();
    const initialFormValues: ChangeFormValues = {
        old_Password: "",
        new_Password: "",
        confirm_Password: "",
    };
    const validationSchema = Yup.object().shape({
        old_Password: Yup.string()
            .required("Old Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at maximum 20 characters"),
        new_Password: Yup.string()
            .required("New Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at maximum 20 characters"),
        confirm_Password: Yup.string()
            .required("Confirm Password is required")
            
    });

    useEffect(() => {
        AOS.init();
    }, []);
    const location = useLocation();
    const { state } = location;
    const handleSaveClick = async (values: FormikValues,
        { setSubmitting }: FormikHelpers<ChangeFormValues>) => {
        try {
            const { old_Password, new_Password, confirm_Password } = values;
            await AuthService.ChangePassword({
                old_Password,
                new_Password,
                confirm_Password
            }, accessToken)
            navigate("/")


        } catch (err) {
            console.error("Change Fail", err)
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<any>; // Use any for generic AxiosError

                if (axiosError.response) {
                    const { data } = axiosError.response;

                    if (data) {
                        if (data.errors) {
                            // Handle validation errors
                            Object.values(data.errors).forEach((errMsgList) => {
                                (errMsgList as string[]).forEach((errMsg: string) => {
                                    toast.error(errMsg);
                                });
                            });
                        } else if (data.message) {
                            // Handle API exceptions
                            toast.error(data.message);
                        }
                    } else {
                        toast.error("An unknown error occurred.");
                    }
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setSubmitting(false);
        }


    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSaveClick}
                    >
                        {({ isSubmitting }) => (
                            <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="old_Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                <Field id="old_Password"
                                    type="password" name="old_Password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <ErrorMessage
                                    className="text-red-500 p-5 bg-white font-medium text-xs"
                                    name="old_Password"
                                    component="div"
                                />
                            </div>

                            <div>
                                <label htmlFor="new_Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <Field id="new_Password"
                                    type="password" name="new_Password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <ErrorMessage
                                    className="text-red-500 p-5 bg-white font-medium text-xs"
                                    name="new_Password"
                                    component="div"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm_Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <Field id="confirm_Password"
                                    type="password" name="confirm_Password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <ErrorMessage
                                    className="text-red-500 p-5 bg-white font-medium text-xs"
                                    name="confirm_Password"
                                    component="div"
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>

                            <button type="submit"
                                disabled={isSubmitting} className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border">
                                Change password
                            </button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>

    );
}