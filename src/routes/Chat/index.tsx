import { Chat } from "../../pages";
import { Details } from "../../pages/Chat/Details";

const chatRoutes = [
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/chat/details",
    element: <Details />,
  },
];

export default chatRoutes;
