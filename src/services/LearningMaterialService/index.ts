import axios from "axios";
import { LearningModule } from "../../interfaces/Learning/LearningModule";
import { AuthService } from "../AuthService";
import { AddLearningChapterDto, CreateLearningModuleDto, UpdateStatusDto } from "../../common/dtos";
import { CreateLearningModuleRequestDto } from "../../common/dtos/LearningModule/CreateLearningModuleRequestDto";
import { LearningModuleRequest } from "../../interfaces/Learning/LearningModuleRequest";
import { Learner, LearningChapter } from "../../interfaces";
const token = AuthService.getAccessToken()

export const LearningMaterialService = {
    addLearningChapter: async (dto: AddLearningChapterDto) : Promise<LearningChapter> => {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningMaterial/Chapter/Create`,dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningChapter: LearningChapter = response.data;
        return learningChapter;
      },
      
    getAllLearningChapterByModuleId: async (id: string | null) : Promise<LearningChapter[]> => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/LearningMaterial/Chapter/GetAll?moduleId=`+id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const learningChapters: LearningChapter[] = response.data;
      return learningChapters;
    }

      
};
