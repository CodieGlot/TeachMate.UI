import React, { useState, useEffect } from 'react';
import { Header } from '../../../layouts';
import { useLocation } from "react-router-dom";
import { SearchService, UserDetailService } from '../../../services';
import { AppUser, LearningModule } from '../../../interfaces';
import { ModuleType } from '../../../common/enums';
import { Subject } from "../../../common/enums";

export function TutorDetail() {
    const [userData, setUserData] = useState<AppUser>();
    const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const location = useLocation();

    // Get tutorId from state
    const tutorId = location.state;
    const getModuleType = (moduleTypeCode: number): string => {
        return ModuleType[moduleTypeCode];
    };

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const data = await UserDetailService.getUserById(tutorId);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (tutorId) {
            fetchUserById();
        }
    }, [tutorId]);

    useEffect(() => {
        const fetchLearningModules = async () => {
            try {
                if (tutorId) {
                    const data = await SearchService.getAllLearningModuleOfOneTutor(tutorId);
                    setLearningModules(data);
                    setTotalPages(Math.ceil(data.length / itemsPerPage)); // Calculate total pages
                    setCurrentPage(1); // Reset to first page on data fetch
                }
            } catch (error) {
                console.error("Failed to fetch learning modules:", error);
            }
        };

        if (tutorId) {
            fetchLearningModules();
        }
    }, [tutorId]);

    const itemsPerPage = 3; // Items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentModules = learningModules.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (direction: string) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getSubjectString = (subjectCode: number): string => {
        return Subject[subjectCode];
    };
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
            <div className="w-full bg-gray-100 py-5">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto bg-white w-full rounded-lg shadow-xl overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-500/50 to-purple-600/50 text-white text-center">
                            <h2 className="text-2xl font-bold">Learning Modules</h2>
                        </div>
                        <div className="p-6 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {currentModules.length > 0 ? (
                                    currentModules.map(module => (
                                        <div key={module.id} className="relative w-full max-w-md min-w-0 mx-auto break-words bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
                                            <div className="p-6 w-full">
                                                <h3 className="text-lg text-indigo-500 font-bold">
                                                    {module.title}
                                                </h3>
                                                <p className="text-sm font-semibold text-gray-500">Title</p>
                                                <p className="mt-3 text-4xl font-bold text-black ">${module.price}</p>
                                                <p className="tesxt-sm font-semibold text-gray-500">Per month</p>

                                                <hr className="my-4" />

                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Subject: {getSubjectString(module.subject)}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Grade Level:{" "}
                                                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                {module.gradeLevel}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Start Date:{" "}
                                                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                {module.startDate}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            End Date:{" "}
                                                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                {module.endDate}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Max Learners:{" "}
                                                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                {module.maximumLearners}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Module Type: {getModuleType(module.moduleType)}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        <span className="block">
                                                            Number of Weeks:{" "}
                                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                                {module.numOfWeeks}
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex justify-center mt-4">
                                                    <button
                                                        className="px-10 py-2 text-sm text-violet-500 bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300 flex items-center justify-center"
                                                    >
                                                        Join
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No learning modules available.</p>
                                )}
                            </div>
                            {/* Pagination Controls */}
                            {learningModules.length > itemsPerPage && (
                                <div className="flex justify-center items-center gap-4 mt-8">
                                    <button
                                        className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${currentPage === 1 ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => handlePageChange("prev")}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <p className="text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </p>
                                    <button
                                        className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${currentPage >= totalPages ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => handlePageChange("next")}
                                        disabled={currentPage >= totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
