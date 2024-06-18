import React, { useState, useEffect } from 'react';
import { AuthService } from '../../../../../services';
import { LearningSession } from '../../../../../interfaces';
import { ScheduleService } from '../../../../../services/ScheduleService';
import { AddNewCustomSessionModal } from '../../../Schedule';


interface ViewClassScheduleProps {
    learningModuleId: number | undefined;
}

export function ViewClassSchedule({ learningModuleId }: ViewClassScheduleProps) {
    const user = AuthService.getCurrentUser();
    const [learningSessions, setLearningSessions] = useState<LearningSession[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        const fetchLearningSessions = async (id: number) => {
            try {
                const data = await ScheduleService.getScheduleById(id);
                setLearningSessions(data);
            } catch (error) {
                console.log("Error fetching learning modules:", error);
            };
        }
        if (learningModuleId !== undefined) {
            fetchLearningSessions(learningModuleId);
        };
    })
    const sessions: LearningSession[] = learningSessions;

    const timeStringToDouble = (timeString: string): number => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours + minutes / 60;
    };

    const getColor = (date: Date): string => {
        const dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 0: return "#fef2f2";
            case 1: return "#fffbeb";
            case 2: return "#f0fdf4";
            case 3: return "#ecfeff";
            case 4: return "#f5f3ff";
            case 5: return "#fdf4ff";
            case 6: return "#fff1f2";
            default: return "";
        }
    };

    const parseDate = (dateString: string) => {
        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        return new Date(year, month - 1, day);
    };
    // State to manage current week index and selected month
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    // Function to get week dates based on index and selected month
    const getWeekDates = (index: number): Date[] => {
        const currentDate = new Date(new Date().getFullYear(), selectedMonth, 1);
        currentDate.setDate(currentDate.getDate() + (index * 7)); // Adjust date based on index
        currentDate.setHours(0, 0, 0, 0); // Start at the beginning of the day

        const weekDates = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i - currentDate.getDay()); // Start from Sunday
            weekDates.push(date);
        }
        return weekDates;
    };

    // Function to render sessions for a given week
    const renderSessions = (weekIndex: number): (JSX.Element | null)[] => {
        const weekDates = getWeekDates(weekIndex);
        // const filteredSessions = filterSessionsByMonth(sessions, selectedMonth);

        return sessions.map((session, index) => {
            const sessionDate = session.date;
            const matchingDay = weekDates.find(day => day.getDate() === parseDate(sessionDate).getDate() && day.getMonth() == parseDate(sessionDate).getMonth());
            if (!matchingDay) return null;

            const leftPosition = 100 + matchingDay.getDay() * 110; // Calculate the left position
            const startTimeDouble = timeStringToDouble(session.startTime);
            const endTimeDouble = timeStringToDouble(session.endTime);
            const topPosition = (startTimeDouble - 7) * 50 + 2;
            const height = (endTimeDouble - startTimeDouble) * 50;
            const color = getColor(matchingDay);

            return (
                <a href={'session?id='+session.id}>
                    <div
                        key={index}
                        className="flex items-center justify-center absolute w-[110px] shadow-md"
                        style={{
                            left: `${leftPosition}px`,
                            top: `${topPosition}px`,
                            height: `${height}px`,
                            backgroundColor: color,
                            borderColor: color,
                            boxShadow: `0 0 10px ${color}`,

                        }}
                    >

                        {session.startTime.substring(0, 5)}-{session.endTime.substring(0, 5)}
                    </div>
                </a>
            );
        }).filter(Boolean); // Filter out any null values
    };

    // Function to handle clicking next week button
    const handleNextWeek = (): void => {
        setCurrentWeekIndex((prevIndex) => prevIndex + 1);
    };

    // Function to handle clicking previous week button
    const handlePreviousWeek = (): void => {
        setCurrentWeekIndex((prevIndex) => prevIndex - 1);
    };

    // Function to handle month selection change
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedMonth = Number(event.target.value);
        setSelectedMonth(selectedMonth);
        setCurrentWeekIndex(0); // Reset current week index when changing month
    };

    // Effect to set current week index on initial load based on current date
    useEffect(() => {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const diffDays = Math.floor((currentDate.getTime() - startOfMonth.getTime()) / (1000 * 3600 * 24));
        const currentWeekIndex = Math.floor(diffDays / 7);
        setCurrentWeekIndex(currentWeekIndex);
    }, []);

    return (
        <>
            <hr />
            <div className="mt-10 py-2 mb-5">
                <h3 className="text-3xl font-bold dark:text-white">Schedule</h3>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">View Class Schedule</p>
                <div className="flex justify-between">
                    <h5 className="text-xl font-bold dark:text-white">
                        {new Date().toLocaleString('en-US', { month: 'long' })}, {new Date().getDate()}-{new Date().getFullYear()}
                    </h5>
                    <div className="flex justify-end gap-2">
                        <select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="border-2 border-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-7 py-2.5 text-center mb-2"
                        >
                            <option value={0}>January</option>
                            <option value={1}>February</option>
                            <option value={2}>March</option>
                            <option value={3}>April</option>
                            <option value={4}>May</option>
                            <option value={5}>June</option>
                            <option value={6}>July</option>
                            <option value={7}>August</option>
                            <option value={8}>September</option>
                            <option value={9}>October</option>
                            <option value={10}>November</option>
                            <option value={11}>December</option>
                        </select>

                        <button
                            type="button"
                            className="text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2"
                            onClick={handlePreviousWeek}
                            disabled={currentWeekIndex === 0} // Disable if already at the first week
                        >
                            Previous Week
                        </button>
                        <button
                            type="button"
                            className="text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2"
                            onClick={handleNextWeek}
                        >
                            Next Week
                        </button>

                        <AddNewCustomSessionModal learningModuleId={learningModuleId} />
                    </div>
                </div>
                <div className="flex text-gray-400 font-serif gap-20 mt-8">
                    <p>Week</p>
                    {getWeekDates(currentWeekIndex).map((day, index) => (
                        <div key={index}>
                            <p>{day.getDate()}/{day.getMonth() + 1}</p>
                            <p>{day.toLocaleString('en-US', { weekday: 'short' })}</p>
                        </div>
                    ))}
                </div>

                {/* Horizontal lines */}
                <div className="relative">
                    {[...Array(15)].map((_, index) => (
                        <div
                            key={index}
                            style={{ top: `${50 + index * 50}px` }}
                            className="absolute right-0 w-[88%] h-[1px] bg-gray-300"
                        ></div>
                    ))}
                </div>
            </div>
            {/* Schedule display area */}
            <div className="relative mt-10 font-mono text-sm">
                {/* Render time slots */}
                {[...Array(15)].map((_, index) => (
                    <div
                        key={index}
                        style={{ top: `${index * 50}px` }}
                        className="absolute left-0 text-gray-400"
                    >
                        {index + 7}:00
                    </div>
                ))}
                {/* Render sessions */}
                {renderSessions(currentWeekIndex)}
            </div>
        </>
    );
}
