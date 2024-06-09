import { CreateLearningModule, ListModule, TeachingDashboard } from "../../pages";

const learningRoutes = [
  {
    path: "/learning",
    element: <TeachingDashboard />,
  },
  {
    path: "/list-learning-module",
    element: <ListModule />,
  },
  { path: "/create-learning-module",
    element: <CreateLearningModule/>
  }
];

export default learningRoutes;
