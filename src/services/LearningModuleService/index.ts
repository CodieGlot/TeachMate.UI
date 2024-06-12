import axios from "axios";
import { LearningModule } from "../../interfaces/Learning/LearningModule";
import { AuthService } from "../AuthService";
import { CreateLearningModuleDto } from "../../common/dtos";
const token = AuthService.getAccessToken()

export const LearningModuleService = {
    getLearningModuleById: async (id: string | null) : Promise<LearningModule> => {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/`+id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningModule: LearningModule = response.data;
        return learningModule;
      },
      
      getAllCreatedLearningModule: async () : Promise<LearningModule[]> => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Tutor/GetAll`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
      },

      createLearningModule: async (dto: CreateLearningModuleDto) : Promise<LearningModule> => {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Create`,dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningModule: LearningModule = response.data;
        return learningModule;
      }
      
};
