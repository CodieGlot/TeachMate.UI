import { useRoutes } from "react-router-dom";
import { Demo, Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
// import chatRoutes from "./Chat";
import profileRoutes from "./Profile";
import scheduleRoutes from "./Schedule";
import searchRoutes from "./Search";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/demo",
      element: <Demo />,
    },
    ...authRoutes,
    ...learningRoutes,
    // ...chatRoutes,
    ...profileRoutes,
    ...scheduleRoutes,
    ...searchRoutes,

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
