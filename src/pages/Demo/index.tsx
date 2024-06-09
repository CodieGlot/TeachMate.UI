import React, { useState, useEffect } from "react";
import { DayOfWeek } from "../../common/enums";

interface Session {
  startTime: string;
  endTime: string;
  dayOfWeek: DayOfWeek;
}
interface ScheduleItem {
  time: string;
  isAvailable: boolean;
  dayOfWeek: DayOfWeek;
  hour: number;
}


export function Demo() {

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(0);
  const [listSession, setListSession] = useState<Session[]>([]);
  // const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  
  const addSession = () => {

    try {
      
      const newSession: Session = { startTime, endTime, dayOfWeek };
      setListSession([...listSession, newSession]);
    } catch (error) {
      console.error("Add learning module failed:", error);
    }
  };
  // const generateSchedule = (listSession: Session[]) => {
    
  //   const newSchedule: ScheduleItem[] = [];
  //   listSession.forEach(element => {
  //     const startHour = parseInt(element.startTime.split(':')[0], 10);
  //     const startMinute = parseInt(element.startTime.split(':')[1], 10);
  //     const endHour = parseInt(element.endTime.split(':')[0], 10);
  //     const endMinute = parseInt(element.endTime.split(':')[1], 10);
  //     const startTimeDouble = startHour + startMinute / 60;
  //     const endTimeDouble = endHour + endMinute / 60;

  //     for (let j = 0; j <=6; j++) {
  //       const dayOfWeek = j;
  //     for (let i = 0; i <= 12; i++) {
  //       const hour = i;
  //       // Calculate if the slot is available based on start and end time
  //       const isAvailable =
  //         // Slot is within the end time
  //         (i < endHour && i > startHour && element.dayOfWeek == dayOfWeek) ||
  //         // Slot is exactly at the end time and end minute is 30 or more
  //         (i === endHour && endMinute >= 30 && element.dayOfWeek == dayOfWeek) ||
  //         // Slot is exactly at the start time and start minute is 30 or less
  //         (i === startHour && startMinute <= 30 && element.dayOfWeek == dayOfWeek);
  //       const time = `${i < 10 ? "0" + i : i}:${i === startHour && element.dayOfWeek == dayOfWeek ? startMinute : (i === endHour && element.dayOfWeek == dayOfWeek ? endMinute : '00')}`;
          
  //         const existingItemIndex = newSchedule.findIndex(
  //           (item) => item.hour === hour && item.dayOfWeek === dayOfWeek
  //         );
    
  //         if (existingItemIndex !== -1) {
  //           // Update the existing item
  //           newSchedule[existingItemIndex].isAvailable =
  //             newSchedule[existingItemIndex].isAvailable || isAvailable;
  //             newSchedule[existingItemIndex].time = time;
  //         } else {
  //           // Add new item
  //           newSchedule.push({ hour, isAvailable, dayOfWeek, time });
  //         }
  //     }}
  //   });
  //   setSchedule(newSchedule);
  // }
  // useEffect(() => {
  //   generateSchedule(listSession);
  // }, [listSession]);
  // useEffect(() => {
  //   console.log("List of schedule:", schedule);
  // }, [schedule]); // Chỉ gọi useEffect khi listSession thay đổi
  
  const isSessionActive = (hour: number, minute: number, day: DayOfWeek) => {
    return listSession.some((session) => {
      const [startHour, startMinute] = session.startTime.split(':').map(Number);
      const [endHour, endMinute] = session.endTime.split(':').map(Number);
      const sessionStart = startHour * 60 + startMinute;
      const sessionEnd = endHour * 60 + endMinute;
      const currentTime = hour * 60 + minute;
      return session.dayOfWeek === day && currentTime >= sessionStart && currentTime <= sessionEnd;
    });
  };
  useEffect(() => {
    console.log("List of sessions:", listSession);
  }, [listSession]); // Chỉ gọi useEffect khi listSession thay đổi
  
  // Hàm này sẽ lấy dữ liệu từ listSession và tạo thành một bảng chứa thông tin các session
  const renderSessionTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {listSession.map((session, index) => (
              <td key={index} className={`bg-indigo-200`}>
                <p>{session.startTime} - {session.endTime}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    
    <div className="container mx-auto">
      
      <input
        type="text"
        onChange={(e) => setStartTime((e.target.value))}
        placeholder="Start time"
        className="block w-full mt-4 mb-2 px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        onChange={(e) => setEndTime((e.target.value))}
        placeholder="End time"
        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />
      <div>
        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
        <select id="subject"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(Number.parseInt(e.target.value))}>
          <option value={DayOfWeek.Sunday}>Sunday</option>
          <option value={DayOfWeek.Monday}>Monday</option>
          <option value={DayOfWeek.Tuesday}>Tuesday</option>
          <option value={DayOfWeek.Wednesday}>Wednesday</option>
          <option value={DayOfWeek.Thursday}>Thursday</option>
          <option value={DayOfWeek.Friday}>Friday</option>
          <option value={DayOfWeek.Saturday}>Saturday</option>
        </select>
      </div>
      <button onClick={addSession}>
        Add
      </button>

        Generate
     
        <table className="min-w-full leading-normal">
        <thead>
          <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hour/ Day</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tuesday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Wednesday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thursday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Friday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Saturday</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sunday</th>
          </tr>
        </thead>
        <tbody>
        {[...Array(13).keys()].map((hour) => (
            [...Array(60).keys()].map((minute, minuteIndex) => (
              <tr key={`${hour}-${minute}`}>
                 {minuteIndex === 0 && (
                    <td className="px-1 py-0.5 border-b border-gray-200 text-xs text-gray-700" rowSpan={60}>
                      {`${hour < 10 ? '0' + hour : hour}:00`}
                    </td>
                  )}
                {[DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday].map((day, index) => (
                  <td

                    key={index}
                    className={`border-b border-gray-200 text-xs ${
                      isSessionActive(hour, minute, day) ? 'bg-purple-200' : 'bg-white'
                    }`}
                  >
                  
                  </td>
                ))}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>

  );
};
