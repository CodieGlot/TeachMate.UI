import axios from "axios";
import { AuthService } from "../AuthService";
import { GiveFeedbackDto } from "../../common/dtos";
import { LearningModule } from "../../interfaces";

const token = AuthService.getAccessToken()

export const FeedbackService = {
  givefeedback: async (dto: GiveFeedbackDto): Promise<LearningModule[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/Learner/AddFeedback`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const learningModules: LearningModule[] = response.data;
    return learningModules;
  },



};