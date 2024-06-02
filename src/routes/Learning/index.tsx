import { ListModule, TeachingDashboard } from "../../pages";

const learningRoutes = [
  {
    path: "/learning",
    element: <TeachingDashboard />,
  },
  {
    path: "/list-learning-module",
    element: <ListModule />,
  },
];

export default learningRoutes;
