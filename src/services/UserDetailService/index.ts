import { AddLearnerDetailDto } from './../../common/dtos/UserDetail/AddLearnerDetailDto';
import axios from "axios";
import { AddTutorDetailDto } from "../../common/dtos/UserDetail";


export const UserDetailService = {

  addTutorDetail: async (dto: AddTutorDetailDto, accessToken: string) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Tutor/AddDetail`,
      dto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      
    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  },
  addLearnerDetail: async (dto: AddLearnerDetailDto, accessToken: string) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Learner/AddDetail`,
      dto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      
    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  },
};
