import React, { useState, useEffect } from 'react';
import { Header } from '../../../layouts';
import { useLocation } from "react-router-dom";
import { SearchService, UserDetailService } from '../../../services';
import { AppUser, LearningModule } from '../../../interfaces';
import { ModuleType } from '../../../common/enums';

export function TutorDetail() {
    const [userData, setUserData] = useState<AppUser>();
    const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
    const location = useLocation();
    const { state } = location;
    const id = state;
    const tutorId = state?.tutorId;
    const getModuleType = (moduleTypeCode: number): string => {
        return ModuleType[moduleTypeCode];
    };

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const data = await UserDetailService.getUserById(id);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (id) {
            fetchUserById();
        }
    }, [id]);

    useEffect(() => {
        const fetchLearningModules = async () => {
            try {
                if (tutorId) {
                    const data = await SearchService.getAllLearningModuleOfOneTutor(tutorId);
                    setLearningModules(data);
                }
                console.log(tutorId)
                console.log(learningModules)
            } catch (error) {
                console.error("Failed to fetch learning modules:", error);
            }
        };

        if (tutorId) {
            fetchLearningModules();
        }
    }, [tutorId]);

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                {userData ? (
                    <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl overflow-hidden">
                        {/* User Profile Section */}
                        <div className="p-6 bg-gradient-to-r from-blue-500/50 to-purple-600/50 text-white text-center">
                            <h2 className="text-2xl font-bold">Profile Information</h2>
                            <img
                                width={200}
                                height={200}
                                className="mx-auto my-7 rounded-full shadow-lg"
                                src={userData.avatar}
                                alt="User Avatar"
                            />
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                <p className="text-gray-500 font-semibold">Full Name</p>
                                <p className="text-gray-700">{userData.displayName}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                <p className="text-gray-500 font-semibold">Phone Number</p>
                                <p className="text-gray-700">{userData.phoneNumber}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                <p className="text-gray-500 font-semibold">Email Address</p>
                                <p className="text-gray-700">{userData.email}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4">
                                <p className="text-gray-500 font-semibold">About</p>
                                <p className="text-gray-700">{userData.tutor?.description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>

            {/* Learning Modules Section */}
            <div className="container mx-auto my-5 px-4">
                <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-500/50 to-purple-600/50 text-white text-center">
                        <h2 className="text-2xl font-bold">Learning Modules</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {learningModules.length > 0 ? (
                                learningModules.map(module => (
                                    <div key={module.tutor.id} className="relative w-full max-w-md min-w-0 mx-auto break-words bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
                                        <div className="p-6">
                                            <h3 className="text-lg text-indigo-500 font-bold mb-2">
                                                {module.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-gray-500">Description: {module.description}</p>
                                            <p className="mt-2 text-4xl font-bold text-black">${module.price}</p>
                                            <p className="text-sm font-semibold text-gray-500">Per month</p>

                                            <hr className="my-4" />

                                            {/* Module Details */}
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">Grade Level: <span className="font-semibold text-gray-900 dark:text-gray-100">{module.gradeLevel}</span></span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">Start Date: <span className="font-semibold text-gray-900 dark:text-gray-100">{module.startDate}</span></span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">End Date: <span className="font-semibold text-gray-900 dark:text-gray-100">{module.endDate}</span></span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">Max Learners: <span className="font-semibold text-gray-900 dark:text-gray-100">{module.maximumLearners}</span></span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">Module Type: <span className="font-semibold text-gray-900 dark:text-gray-100">{getModuleType(module.moduleType)}</span></span>
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    <span className="block">Number of Weeks: <span className="font-semibold text-gray-900 dark:text-gray-100">{module.numOfWeeks}</span></span>
                                                </p>
                                            </div>

                                            {/* Join Button */}
                                            <button
                                                className="mt-4 w-full rounded-lg border-2 border-indigo-400 px-10 py-2 text-sm text-indigo-500 font-semibold hover:bg-indigo-400 hover:text-white transition duration-300"
                                            >
                                                Join
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Loading learning modules...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
                    disabled={false} // Replace with your actual pagination state
                >
                    Previous
                </button>
                <p className="text-gray-600">
                    Page 1 of 10
                </p>
                <button
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
                    disabled={false} // Replace with your actual pagination state
                >
                    Next
                </button>
            </div>

            {/* Support Link */}
            <a
                href="src/assets/donate.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 p-4 rounded-full text-white fixed right-4 bottom-4 shadow-lg hover:bg-purple-700 transition duration-300"
            >
                Support me by buying a coffee
            </a>
        </>
    );
}
