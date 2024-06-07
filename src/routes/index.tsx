import { useRoutes } from "react-router-dom";
import { Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    ...authRoutes,
    ...learningRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
