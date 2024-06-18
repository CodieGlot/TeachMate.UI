import { CreateLearningModule, LearningDashboard, LearningModuleDetail, ListModule, ListRequestsForClass, RequestJoinLearningModule, TeachingDashboard, UpdateLearningModule } from "../../pages";

const learningRoutes = [
  {
    path: "/teaching",
    element: <TeachingDashboard />,
  },{
    path: "/learning",
    element: <LearningDashboard />,
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
  },
  {
    path: "/request-join",
    element: <RequestJoinLearningModule/>
  },

  {
    path: "/list-request-class",
    element: <ListRequestsForClass/>
  },
];

export default learningRoutes;
