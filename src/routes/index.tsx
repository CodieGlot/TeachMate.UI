import { useRoutes } from "react-router-dom";
import { Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
import chatRoutes from "./Chat";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    ...authRoutes,
    ...learningRoutes,
    ...chatRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
