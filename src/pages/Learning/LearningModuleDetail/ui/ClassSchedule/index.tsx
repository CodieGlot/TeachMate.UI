import React, { useState, useEffect } from 'react';

type Session = {
    startTime: string;
    endTime: string;
    date: string;
};

export function ViewClassSchedule() {
    // Mock data for demonstration (replace with actual data if needed)
    const sessions: Session[] = [
        { startTime: '8:30', endTime: '10:00', date: "2024-06-10" },
        { startTime: '8:30', endTime: '10:00', date: "2024-06-11" },
        { startTime: '8:30', endTime: '10:00', date: "2024-06-12" },
        { startTime: '9:30', endTime: '13:00', date: "2024-06-13" },
        { startTime: '10:30', endTime: '12:00', date: "2024-06-14" },
        
    ];

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
        let parts = dateString.split('-');
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let day = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };
    // State to manage current week index and selected month
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    // Function to get week dates based on index and selected month
    const getWeekDates = (index: number): Date[] => {
        const currentDate = new Date(new Date().getFullYear(), selectedMonth, 1);
        currentDate.setDate(currentDate.getDate() + (index * 7)); // Adjust date based on index
        currentDate.setHours(0, 0, 0, 0); // Start at the beginning of the day
    
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i - currentDate.getDay()); // Start from Sunday
            weekDates.push(date);
        }
        return weekDates;
    };

    // Function to filter sessions by selected month
    const filterSessionsByMonth = (sessions: Session[], month: number): Session[] => {
        return sessions.filter(session => parseDate(session.date).getMonth() === month);
    };

    // Function to render sessions for a given week
    const renderSessions = (weekIndex: number): (JSX.Element | null)[] => {
        const weekDates = getWeekDates(weekIndex);
        const filteredSessions = filterSessionsByMonth(sessions, selectedMonth);
        
        return filteredSessions.map((session, index) => {
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
                <div
                    key={index}
                    className="flex items-center justify-center absolute w-[110px] shadow-md"
                    style={{
                        left: `${leftPosition}px`,
                        top: `${topPosition}px`,
                        height: `${height}px`,
                        backgroundColor: color,
                        borderColor: color,
                        boxShadow: `0 0 10px ${color}`
                    }}
                >
                    {matchingDay.toLocaleDateString('en-US', { weekday: 'short' })}: {session.startTime}-{session.endTime}
                </div>
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
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
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
                    </div>
                </div>
                <div className="flex text-gray-400 font-serif gap-20 mt-8">
                    <p>Week</p>
                    {getWeekDates(currentWeekIndex).map((day, index) => (
                        <div key={index}>
                            <p>{day.getDate()}/{day.getMonth()}</p>
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
