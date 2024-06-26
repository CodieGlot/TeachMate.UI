import { useRoutes } from "react-router-dom";
import { Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
// import chatRoutes from "./Chat";
import profileRoutes from "./Profile";
import scheduleRoutes from "./Schedule";
import searchRoutes from "./Search";
import feedbackRoutes from "./Feedback"
import adminRoutes from "./Admin"
import contactRoutes from "./Contact";
import forumRoutes from "./Forum";
import materialRoutes from "./Material";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    ...authRoutes,
    ...learningRoutes,
    // ...chatRoutes,
    ...profileRoutes,
    ...scheduleRoutes,
    ...searchRoutes,
    ...feedbackRoutes,
    ...adminRoutes,
    ...contactRoutes,
    ...forumRoutes,
    ...materialRoutes,
    {
      path: "*",
      element: <NotFound />,
    },

  ]);

  return routes;
};

export default Route;
