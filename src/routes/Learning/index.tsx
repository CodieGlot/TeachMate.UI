import { CreateLearningModule, LearningModuleDetail, ListModule, TeachingDashboard, UpdateLearningModule } from "../../pages";

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
  },
  {
    path: "/view-learning-module-detail",
    element: <LearningModuleDetail/>
  },
  {
    path: "/update-learning-module-detail",
    element: <UpdateLearningModule/>
  }
];

export default learningRoutes;
