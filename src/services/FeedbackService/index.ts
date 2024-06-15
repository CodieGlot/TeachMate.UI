import axios from "axios";
import { AuthService } from "../AuthService";
import { GiveFeedbackDto } from "../../common/dtos";

const token = AuthService.getAccessToken()

export const FeedbackService = {
  givefeedback: async (dto: GiveFeedbackDto) => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/Learner/AddFeedback`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  },



};