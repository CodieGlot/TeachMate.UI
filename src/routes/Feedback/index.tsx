import { GiveFeedback, ReceiveFeedback } from "../../pages";

const feedbackRoutes = [
  {
    path: "/givefeedback",
    element: <GiveFeedback />
  },
  {
    path: "/receivefeedback",
    element: <ReceiveFeedback />
  }


];

export default feedbackRoutes;