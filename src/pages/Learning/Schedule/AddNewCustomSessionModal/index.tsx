import { useState } from "react";
import { AuthService } from "../../../../services";
import { ScheduleService } from "../../../../services/ScheduleService";

interface AddNewCustomSessionModalProps {
    learningModuleId: number | undefined;
}

export function AddNewCustomSessionModal({ learningModuleId }: AddNewCustomSessionModalProps) {
    const user = AuthService.getCurrentUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const [title, setTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("7:00");
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [linkMeet, setLinkMeet] = useState<string>("");

    const handleCreateNewCustomSession = async () => {

        try {
            if (typeof learningModuleId === 'undefined') {
                throw new Error("learningModuleId is required");
              }
          const learningSession = await ScheduleService.createFreeLearningSession({
            title,
            learningModuleId,
            startTime,
            linkMeet,
            date
          });
         window.location.reload();
        } catch (error) {
          console.error("Add free learning session failed:", error);
        }
      };

    return (
        <>
            <div>
                {user?.tutor !== null && (
                    <button
                        onClick={toggleModal}
                        className="text-white bg-indigo-400 hover:bg-indigo-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-4 text-center mb-2"
                        type="button"
                    >
                        Add free session
                    </button>
                )}

                {isModalOpen && user?.tutor !== null && (
                    <div
                        id="default-modal"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden inset-0 bg-gray-800 bg-opacity-75"
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add free session
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={toggleModal}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 space-y-4">
                                    <label
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type class title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="p-4 md:p-5 space-y-4">
                                    <div className="w-full max-w-[7rem]">
                                        <label
                                            htmlFor={`start-time`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Start time
                                        </label>
                                        <input
                                            type="time"
                                            id={`start-time`}
                                            name={`start-time`}
                                            className="bg-gray-50 border leading-none border-indigo-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            
                                            min="09:00"
                                            max="18:00"
                                            required
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <label
                                            htmlFor="startDate"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Date
                                        </label>
                                        <div className="relative max-w-sm">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Select date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="p-4 md:p-5 space-y-4">
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Link online session
                                        </label>
                                        <input
                                            type="text"
                                            name="linkMeet"
                                            id="linkMeet"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type link"
                                            required
                                            value={linkMeet}
                                            onChange={(e) => setLinkMeet(e.target.value)}
                                        />
                                    </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handleCreateNewCustomSession}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={toggleModal}
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}
