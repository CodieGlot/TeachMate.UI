import { Login, Signup } from "../../pages";

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
];

export default authRoutes;
