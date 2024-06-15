import { AddWeeklySchedule, UserSchedule} from "../../pages";

const scheduleRoutes = [
  {
    path: "/add-weekly-schedule",
    element: <AddWeeklySchedule />,
  },
  {
    path: "/schedule",
    element: <UserSchedule />,
  },
];

export default scheduleRoutes;
