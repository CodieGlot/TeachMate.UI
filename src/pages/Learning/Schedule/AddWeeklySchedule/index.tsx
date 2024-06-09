
import { useEffect, useState } from "react";
import { Header } from "../../../../layouts";
import { DayOfWeek } from "../../../../common/enums";


export function AddWeeklySchedule() {
    const [slots, setSlots] = useState<JSX.Element[]>([]);

    const deleteSlot  = (key: number) => {
        setSlots(prevElements => prevElements.filter((_, index) => index !== key));
    }

    const generateUniqueKey = () => {
        return '_' + Math.random().toString(36);
      };

    const addSlots: React.MouseEventHandler<HTMLButtonElement> = () => {
        const keyForDiv = generateUniqueKey();
        setSlots(prevElements => [
            ...prevElements,

            <div className="mb-6" key={keyForDiv}>

                <div className="flex items-center justify-between">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select id="underline_select" className="appearance-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 p-2.5 ring-1 ring-indigo-100 text-gray-900 rounded-lg">
                        <option selected value={DayOfWeek.Sunday}>Sunday</option>
                        <option value={DayOfWeek.Monday}>Monday</option>
                        <option value={DayOfWeek.Tuesday}>Tuesday</option>
                        <option value={DayOfWeek.Wednesday}>Wednesday</option>
                        <option value={DayOfWeek.Thursday}>Thursday</option>
                        <option value={DayOfWeek.Friday}>Friday</option>
                        <option value={DayOfWeek.Saturday}>Saturday</option>
                    </select>
                    <div className="w-full max-w-[7rem]">
                        <label htmlFor="start-time-monday" className="sr-only">Start time:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="time" id="start-time-monday" name="start-time-monday" className="bg-gray-50 border leading-none border-indigo-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="00:00" min="09:00" max="18:00" required />
                        </div>
                    </div>
                    <div className="w-full max-w-[7rem]">
                        <label htmlFor="end-time-monday" className="sr-only">End time:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="time" id="end-time-monday" name="end-time-monday" className="bg-gray-50 border leading-none border-indigo-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" defaultValue="00:00" required />
                        </div>
                    </div>
                    <div>
                        <button type="button" className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => deleteSlot(prevElements.length)}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                            </svg>
                            <span className="sr-only">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        ]);
    };

    return (
        <>
            <Header />


            {/* <div className="text-center">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-timepicker" data-drawer-show="drawer-timepicker" aria-controls="drawer-timepicker">
                    Set time schedule
                </button>
            </div> */}
            {/* <div id="drawer-timepicker" className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-timepicker-label">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Time schedule</h5>
                <button type="button" data-drawer-hide="drawer-timepicker" aria-controls="drawer-timepicker" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button> */}
            <div className="mx-auto w-1/2">
                <form>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-900 dark:text-white text-base font-medium">Business hours</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" name="business-hours" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="sr-only">Business hours</span>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Enable or disable business working hours for all weekly working days</p>
                    </div>
                    <div className="mb-6 leading-normal text-indigo-400 font-semibold">

                        <div className="flex items-center justify-between">
                            <h4 >Day of week</h4>
                            
                            <h4 className="w-full max-w-[7rem]">
                               Start Time
                            </h4>
                            <h4 className="w-full max-w-[7rem]">
                               End Time
                            </h4>
                            <div>
                             
                            </div>
                        </div>
                    </div>
                    {slots.map(element => (
                        <div key={element.key}>{element}</div>
                    ))}
                    <button onClick={addSlots} type="button" className="inline-flex items-center justify-center w-full py-2.5 mb-4 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <svg className="w-4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Add interval
                    </button>
                    {/* <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
                        <button type="button" data-drawer-hide="drawer-timepicker" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                        <button type="submit" className="text-white w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save all
                        </button>
                    </div> */}
                </form>


            </div>
            <div className="flex flex-col w-2/3 mx-auto ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                                <thead
                                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>

                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Monday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Tuesday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Wednesday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Thursday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Friday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Saturday
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                            Sunday
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-neutral-200 dark:border-white/10">
                                        <td
                                            className="bg-indigo-100 whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">

                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                    </tr>
                                    <tr className="border-b border-neutral-200 dark:border-white/10">
                                        <td
                                            className="bg-indigo-100 whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">

                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            COPY
            Borderless
            {/* </div> */}

        </>
    );
}
