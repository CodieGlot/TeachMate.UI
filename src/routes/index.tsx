import { useRoutes } from "react-router-dom";
import { Demo, Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
import chatRoutes from "./Chat";
import profileRoutes from "./Profile";
import scheduleRoutes from "./Schedule";
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
    ...chatRoutes,
    ...profileRoutes,
    ...scheduleRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
