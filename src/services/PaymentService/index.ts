import axios from "axios";
import { AuthService } from "../AuthService";
import { OrderUrlResponseDto, SetPriceDto } from "../../common/dtos/Payment";
import { LearningModule, PaymentOrder } from "../../interfaces";


const token = AuthService.getAccessToken()

export const PaymentService = {

  setPriceForLearningModule: async (dto: SetPriceDto): Promise<LearningModule> => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/Payment/SetPriceForLearningModule`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const prices: LearningModule = response.data;
    return prices;
  },

  payForClass : async (id: number | undefined)=> {
   await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/Payment/PayForClass?OrderID=`+id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

  },
  getAllUnPaidByModuleIdByLearnerId : async(id:string | null) : Promise<PaymentOrder>=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/Payment/GetAllUnPaidByModuleIdByLearnerId?moduleId=`+id,[],
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const order : PaymentOrder = response.data
      return order
  },
  getPaymentOrderByModuleIdByLearnerId : async(id:string | null) : Promise<PaymentOrder[]>=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/Payment/GetAllPaymentOrderByModuleIdByLearnerId?moduleId=`+id,[],
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const order : PaymentOrder[] = response.data
      return order
  },

  createZaloPayOrder : async (amount: Number) : Promise<OrderUrlResponseDto> => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/Payment/zalopay?amount=`+amount, amount,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const url : OrderUrlResponseDto = response.data
    return url
  },

  createVnPayOrder : async (amount: Number) : Promise<OrderUrlResponseDto> => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/Payment/vnpay?amount=`+amount, amount,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const url : OrderUrlResponseDto = response.data
    return url
  },

  createMomoPayOrder : async (amount: Number) : Promise<OrderUrlResponseDto> => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/Payment/momo?amount=`+amount, amount,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const url : OrderUrlResponseDto = response.data
    return url
  },
};