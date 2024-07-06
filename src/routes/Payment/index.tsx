import { LearnerPayment, SetPrice } from "../../pages/Payment";
import PaymentNavigate from "../../pages/Payment/PaymentResult";


const paymentRoutes = [
  {
    path: "/setprice",
    element: <SetPrice />,
  },
  {
    path: "/learnerpayment",
    element: <LearnerPayment />,
  },
  {
    path: "/payment/success",
    element: <PaymentNavigate />,
  },
  
];

export default paymentRoutes;