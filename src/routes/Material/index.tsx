import { ListMaterial, UploadMaterial } from "../../pages";

const materialRoutes = [
  {
    path: "/material",
    element: <ListMaterial />,
  },
  {
    path: "/upload-material",
    element: <UploadMaterial/>
  }
 


];

export default materialRoutes;