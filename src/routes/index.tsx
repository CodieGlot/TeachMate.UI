import { useRoutes } from "react-router-dom";
import { Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
// import chatRoutes from "./Chat";
import profileRoutes from "./Profile";
import scheduleRoutes from "./Schedule";
import searchRoutes from "./Search";
import feedbackRoutes from "./Feedback"
import contactRoutes from "./Contact";
import forumRoutes from "./Forum";

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
    ...contactRoutes,
    ...forumRoutes,

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
