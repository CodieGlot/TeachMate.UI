import axios from "axios";
import { LearningModule } from "../../interfaces/Learning/LearningModule";
import { AuthService } from "../AuthService";
import { CreateLearningModuleDto, UpdateStatusDto } from "../../common/dtos";
import { CreateLearningModuleRequestDto } from "../../common/dtos/LearningModule/CreateLearningModuleRequestDto";
import { LearningModuleRequest } from "../../interfaces/Learning/LearningModuleRequest";
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
      getAllEnrolledLearningModule: async () : Promise<LearningModule[]> => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Learner/GetAll`,
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
      },
      createLearningModuleRequest: async (dto: CreateLearningModuleRequestDto) : Promise<LearningModuleRequest> => {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Request/Create`,dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningModuleRequest: LearningModuleRequest = response.data;
        return learningModuleRequest;
      },

      getAllReceivedRequestsByModuleId: async (id: string | null) : Promise<LearningModuleRequest[]> => {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Request/LearningModule/GetAll?moduleId=`+id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningModuleRequests: LearningModuleRequest[] = response.data;
        return learningModuleRequests;
      },

      updateRequestStatus: async (dto: UpdateStatusDto) : Promise<LearningModuleRequest> => {
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/LearningModule/Request/UpdateStatus`,
          dto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const learningModuleRequests: LearningModuleRequest = response.data;
        return learningModuleRequests;
      },
      
};
