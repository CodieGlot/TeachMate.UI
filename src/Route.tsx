import { useRoutes } from "react-router-dom";
import { Home, Login, NotFound, Signup, ListModule } from "./pages";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
    },
    {
      path: "/learning",
      element: <ListModule />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Route;
