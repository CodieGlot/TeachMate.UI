import { AddTutorDetail, Profile } from "../../pages";
import { AddLearnerDetail } from "../../pages/Profile/AddLearnerDetail";
const profileRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/add-tutor-detail",
    element: <AddTutorDetail/>
  },
  {
    path: "/add-learner-detail",
    element: <AddLearnerDetail/>
  }
];

export default profileRoutes;
