
import React, { useState } from 'react';
import { Header } from '../../../layouts';


export function TutorDetail() {
    const [menu1Open, setMenu1Open] = useState(false);
    const [menu2Open, setMenu2Open] = useState(false);
    const [menu3Open, setMenu3Open] = useState(false);

    const toggleMenu1 = () => {
        setMenu1Open(!menu1Open);
    };

    const toggleMenu2 = () => {
        setMenu2Open(!menu2Open);
    };

    const toggleMenu3 = () => {
        setMenu3Open(!menu3Open);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-sky-400/20 to-indigo-600/20">
                <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl">
                    <div className="p-4 border-b">
                        <h2 className="Block bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent font-bold">Profile Information</h2>
                    </div>
                    <div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Full name</p>
                            <p>Jane Doe</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Rating</p>
                            <p>Product Manager</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">Email Address</p>
                            <p>Janedoe@gmail.com</p>
                        </div>
                        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                            <p className="text-gray-600">About</p>
                            <p>
                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                            </p>
                        </div>
                    </div>
                </div>

                <a
                    href="src/assets/donate.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 p-2 rounded-lg text-white fixed right-0 bottom-0"
                >
                    Support me by buying a coffee
                </a>
            </div>
            <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
                <div className="flex flex-col justify-start items-start">
                    <div className="mt-3">
                        <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Class</h1>
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">03 items</p>
                    </div>
                    <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                        {/* Product 1 */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <img className="hidden lg:block" src="https://i.ibb.co/SsmkhPq/Rectangle-23.png" alt="bag" />
                                <img className="hidden sm:block lg:hidden" src="https://i.ibb.co/ZH9FmZL/Rectangle-23-1.png" alt="bag" />
                                <img className="sm:hidden" src="https://i.ibb.co/cyN26yn/Rectangle-23.png" alt="bag" />
                                <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400">
                                    <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">New York Streak</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button aria-label="show menu" onClick={toggleMenu1} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200">
                                        <svg className={menu1Open ? 'hidden' : 'fill-stroke'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <svg className={menu1Open ? 'fill-stroke' : 'hidden'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={menu1Open ? 'flex flex-col justify-start items-start mt-12' : 'hidden'}>
                                <div>
                                    <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">MK617</p>
                                </div>
                                <div className="mt-2">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Beige brown</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">42 size</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">$1,000</p>
                                </div>
                                <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white bg-white border border-gray-800 dark:border-white dark:hover:bg-gray-800 dark:hover:text-white">More information</button>
                                    </div>
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <img className="hidden lg:block" src="https://i.ibb.co/WVySXBL/Rectangle-24.png" alt="watch" />
                                <img className="hidden sm:block lg:hidden" src="https://i.ibb.co/9sqGrR6/Rectangle-24-1.png" alt="watch" />
                                <img className="sm:hidden" src="https://i.ibb.co/wCGrdFt/Rectangle-24.png" alt="watch" />
                                <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400">
                                    <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">Luxe 3 series</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button aria-label="show menu" onClick={toggleMenu2} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200">
                                        <svg className={menu2Open ? 'hidden' : 'fill-stroke'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <svg className={menu2Open ? 'fill-stroke' : 'hidden'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={menu2Open ? 'flex flex-col justify-start items-start mt-12' : 'hidden'}>
                                <div>
                                    <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">MK617</p>
                                </div>
                                <div className="mt-2">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Beige brown</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">42 size</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">$1,000</p>
                                </div>
                                <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white bg-white border border-gray-800 dark:border-white dark:text-white dark:bg-transparent dark:border-white dark:hover:bg-gray-800 dark:hover:text-white">More information</button>
                                    </div>
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <img className="hidden lg:block" src="https://i.ibb.co/JqD4MwR/Rectangle-5.png" alt="shoes" />
                                <img className="hidden sm:block lg:hidden" src="https://i.ibb.co/MG7JYJ4/Rectangle-5-1.png" alt="shoes" />
                                <img className="sm:hidden" src="https://i.ibb.co/89gMng3/Rectangle-5.png" alt="shoes" />
                                <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white dark:text-gray-800 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400">
                                    <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">EZ sneakers</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button aria-label="show menu" onClick={toggleMenu3} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400 dark:bg-gray-50 dark:text-gray-900 hover:bg-gray-200">
                                        <svg className={menu3Open ? 'hidden' : 'fill-stroke'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <svg className={menu3Open ? 'fill-stroke' : 'hidden'} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={menu3Open ? 'flex flex-col justify-start items-start mt-12' : 'hidden'}>
                                <div>
                                    <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">MK617</p>
                                </div>
                                <div className="mt-2">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Beige brown</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">42 size</p>
                                </div>
                                <div className="mt-6">
                                    <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">$1,000</p>
                                </div>
                                <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white bg-white border border-gray-800 dark:border-white dark:text-white dark:bg-transparent dark:border-white dark:hover:bg-gray-800 dark:hover:text-white">More information</button>
                                    </div>
                                    <div className="w-full">
                                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


