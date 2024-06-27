import { useState, useEffect } from 'react';
import { Header } from "../../../../layouts";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LearningModuleDetail } from '../../LearningModuleDetail';
import { ViewClassSchedule } from '../../LearningModuleDetail/ui/ClassSchedule';
import { ListRequestsForClass } from '../../LearningModuleRequest';
import { LearnersInClass } from '../ListLearners';
import { ReceiveFeedback } from '../../../Feedback';
import { SetPrice } from '../../../Payment';

export function ManageClass() {
    // Tạo state để lưu trữ tab đang được chọn
    const [selectedTab, setSelectedTab] = useState<string>('tutor');
    useEffect(() => {
        AOS.init();
    }, []);
    // Hàm để cập nhật tab đang được chọn
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    return (
        <>
            <Header />
            <div data-aos="zoom-in-left" data-aos-duration="1000">
                <div className="md:flex w-5/6 mx-auto mt-5">
                    <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('tutor')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'tutor' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg active w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                aria-current={selectedTab === 'tutor' ? 'page' : undefined}
                            >
                                <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                Info
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('class')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'class' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                                Schedule
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('settings')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'settings' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                </svg>
                                Request
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('contact')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'contact' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                    <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                                </svg>
                                Feedback
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('learner')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'learner' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                    <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                                </svg>
                                Learners
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('payment')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'payment' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                                    <path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V192H0V96zM0 320V224H576V320H0zm0 32H576v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V352z" />
                                </svg>
                                Payment
                            </a>
                        </li>
                    </ul>
                    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">

                        {selectedTab === 'tutor' && (
                            <LearningModuleDetail />
                        )}
                        {selectedTab === 'class' && (
                            <ViewClassSchedule />
                        )}
                        {selectedTab === 'settings' && (
                            <ListRequestsForClass />
                        )}
                        {selectedTab === 'contact' && (
                            <ReceiveFeedback />
                        )}
                        {selectedTab === 'learner' && (
                            <LearnersInClass />
                        )}
                        {selectedTab === 'payment' && (
                            <SetPrice />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}