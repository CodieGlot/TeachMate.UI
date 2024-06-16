import { Header } from "../../../../layouts";
import { AuthService } from "../../../../services";


export function LearningSessionDetail() {
    const user = AuthService.getCurrentUser();


    return (
        <>
            <Header />
            <div>
                <div className=" mx-auto py-2 mb-5 text-center">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Class: </span></h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">View your learning session detail here </p>
                </div>
                <div className="bg-white border border-gray-100 w-2/3 mx-auto p-5">
                    <div className="flex">
                        <div> <div className="w-20 bg-sky-100 text-sky-400 hover:text-white border border-sky-400 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-400 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-purple-400 ">
                            <svg className="p-2" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <defs>
                                        <style>{`.cls-1{fill-rule:evenodd}`}

                                        </style>
                                    </defs>
                                    <path d="M53.11 141.57a5.8 5.8 0 0 1 8.2-.3l6.69 6.26a5.81 5.81 0 0 1-7.91 8.47l-6.69-6.24a5.82 5.82 0 0 1-.29-8.19Zm86.13 0a5.8 5.8 0 0 0-8.2-.3l-6.69 6.25a5.81 5.81 0 0 0 7.91 8.51l6.69-6.24a5.82 5.82 0 0 0 .29-8.22Z" className="cls-1"></path>
                                    <path d="M163.29 63.1 141 68.64v-19a15.12 15.12 0 0 0-21-13.94Q102.8 43 96.35 43t-24-7.42a15.12 15.12 0 0 0-21 13.93v19.2L28.71 63.1a5.31 5.31 0 0 0-6.59 5.52 40.62 40.62 0 0 0 30 36.21 44.86 44.86 0 0 0 88.11-.1 40.63 40.63 0 0 0 29.64-36.11 5.31 5.31 0 0 0-6.58-5.52Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd"></path>
                                    <rect width="11.61" height="18.56" x="70.31" y="63.64" rx="5.81"></rect>
                                    <rect width="11.61" height="18.56" x="110.07" y="63.64" rx="5.81"></rect>
                                    <path d="M87.46 85.69a9 9 0 0 1 9.13-7.07 8.88 8.88 0 0 1 8.65 7.07V86c0 .26-.08.36-.32.33l-8.32 1.51h-.49l-8.33-1.49c-.23 0-.32-.08-.32-.33Z"></path>
                                    <path d="M96.42 89.66h-.49l-6-1.07v.55a6.44 6.44 0 0 0 12.88 0v-.61Z" className="cls-1"></path>
                                </g>
                            </svg>
                        </div></div>


                        <div className="w-5/6 ml-3">
                            <h2 className="font-semibold font-sans text-lg">Session 8/10: Get to know each other. Ask for and give personal information
                                <span className="bg-sky-100 py-1 px-3 rounded ml-2 text-sm">Planned</span>

                            </h2>

                            <div className="mt-3 flex text-gray-500">
                                <button type="button" className=" flex  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg className="w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z" fill="#1C274C"></path>
                                            <path opacity="0.5" d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z" fill="#1C274C"></path>
                                            <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path>
                                            <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path>
                                            <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path>
                                            <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path>
                                            <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path>
                                            <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path>
                                        </g>
                                    </svg>
                                    <span>Wednesday, 14 Jan</span>
                                </button>
                                <button type="button" className=" flex  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg className="w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                opacity="0.5"
                                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                fill="#1C274C"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                                                fill="#1C274C"
                                            ></path>
                                        </g>
                                    </svg>
                                    <span>9:00 - 11:00</span>
                                </button>
                                <button type="button" className=" flex  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <span>1 - 1</span>
                                </button>
                            </div>
                           
                        </div>


                    </div>
                    <div className="flex justify-end">
                            <button type="button" className="flex  mt-5 text-white bg-sky-500 hover:bg-white hover:border hover:border-sky-500 hover:text-sky-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg fill="currentColor" stroke="currentColor" className="w-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
                                    <style>{`.st0{stroke:#ffffff;stroke-width:0.05;stroke-miterlimit:10;}`}</style>
                                    <g id="grid_system"></g>
                                    <g id="_icons">
                                        <path className="st0" d="M20.8,7.3C20,6.8,19,6.6,18.1,6.9l-2.3,0.8C15.2,6.1,13.7,5,12,5H6C3.8,5,2,6.8,2,9v6c0,2.2,1.8,4,4,4h6c1.7,0,3.2-1.1,3.8-2.7l2.3,0.8c0.3,0.1,0.6,0.2,1,0.2c0.6,0,1.2-0.2,1.7-0.6c0.8-0.6,1.2-1.5,1.2-2.4V9.8C22,8.8,21.5,7.9,20.8,7.3z M12,17H6c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2v6C14,16.1,13.1,17,12,17z M20,14.2c0,0.3-0.2,0.6-0.4,0.8c-0.3,0.2-0.6,0.2-0.9,0.1L16,14.3V9.7l2.7-0.9C19,8.7,19.3,8.8,19.6,9C19.8,9.2,20,9.4,20,9.8V14.2z" fill="currentColor" />
                                    </g>
                                </svg>
                                Join the session</button>
                                </div>
                </div>

            </div>

        </>
    );
}
