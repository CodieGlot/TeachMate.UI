import axios from "axios";
import { AuthService } from "../AuthService";
import { AddWeeklyScheduleDto } from "../../common/dtos";
import { LearningModule, LearningSession } from "../../interfaces";

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

  getScheduleById: async (id: number) : Promise<LearningSession[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Schedule/GetScheduleById?id=`+id,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  const learningSessions: LearningSession[] = response.data;
  return learningSessions;
  },
  getScheduleByTutor: async () : Promise<LearningSession[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Schedule/GetScheduleByTutor`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  const learningSessions: LearningSession[] = response.data;
  return learningSessions;
  },
  getScheduleByLearner: async () : Promise<LearningSession[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Schedule/GetScheduleByLearner`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  const learningSessions: LearningSession[] = response.data;
  return learningSessions;
  },
 
};