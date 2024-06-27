import axios from "axios";
import { AuthService } from "../AuthService";
import { SetPriceDto } from "../../common/dtos/Payment";
import { LearningModule } from "../../interfaces";


const token = AuthService.getAccessToken()

export const PaymentService = {

  setPriceForLearningModule: async (dto: SetPriceDto): Promise<LearningModule[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Payment/SetPriceForLearningModule`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const prices: LearningModule[] = response.data;
    return prices;
  },
};