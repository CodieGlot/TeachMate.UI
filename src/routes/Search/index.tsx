import { SearchTutor, SearchClass, SearchCategory } from "../../pages";

const searchRoutes = [
  {
    path: "/searchClass",
    element: <SearchClass />,
  },
  {
    path: "/searchTutor",
    element: <SearchTutor />,
  },
  {
    path: "/search",
    element: <SearchCategory />
  },


];

export default searchRoutes;