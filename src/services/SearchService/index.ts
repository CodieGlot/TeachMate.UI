import axios from "axios";
import { AuthService } from "../AuthService";
import { SearchClassDto, SearchTutorDto } from "../../common/dtos";
import { AppUser, LearningModule } from "../../interfaces";

const token = AuthService.getAccessToken()

export const SearchService = {
  searchClass: async (dto: SearchClassDto): Promise<LearningModule[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Search/Classes`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const learningModules: LearningModule[] = response.data;
    return learningModules;
  },

  searchTutor: async (dto: SearchTutorDto): Promise<AppUser[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Search/Tutor` + "?DisplayName=" + dto.displayName,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    const tutors: AppUser[] = response.data;
    return tutors;
  },

  // getAverageRatingByStar: async (id: string | null): Promise<number> => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_URL}/api/Feedback/GetAverageRatingByStar/` + id,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       }
  //     );
  //     const averageRating: number = response.data;
  //     return averageRating;
  //   } catch (error) {
  //     console.error("Error fetching average rating:", error);
  //     throw error;
  //   }
  // },
};