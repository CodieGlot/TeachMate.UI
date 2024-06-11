import { ChangePassword, ForgetPassword, Login, Signup } from "../../pages";
import { SendOTP } from "../../pages/Auth/SendOTP";

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/SendOTP",
    element: <SendOTP />,
  },
  {
    path: "/auth/Forgetpassword",
    element: <ForgetPassword />,
  },
  {
    path: "/auth/ChangePassword",
    element: <ChangePassword />,
  },
];

export default authRoutes;