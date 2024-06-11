import axios from "axios";
import { AuthService } from "../AuthService";
import { AddWeeklyScheduleDto } from "../../common/dtos";
import { LearningModule } from "../../interfaces";

const token = AuthService.getAccessToken()

export const ScheduleService = {
  addWeeklySchedule: async (dto: AddWeeklyScheduleDto): Promise<LearningModule> => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/Schedule/AddWeeklySchedule`,
        dto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
    const learningModule: LearningModule = response.data;
    return learningModule;
  },

 
};