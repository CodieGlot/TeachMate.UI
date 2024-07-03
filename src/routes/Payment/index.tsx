import { LearnerPayment, SetPrice } from "../../pages/Payment";


const paymentRoutes = [
  {
    path: "/setprice",
    element: <SetPrice />,
  },
  {
    path: "/learnerpayment",
    element: <LearnerPayment />,
  },
  
];

export default paymentRoutes;