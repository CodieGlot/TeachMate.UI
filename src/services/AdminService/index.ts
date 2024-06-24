import axios from "axios";
import { AppUser } from "../../interfaces";
import { AuthService } from "../AuthService";
import { SearchUserDto } from "../../common/dtos";
import { DisableDto } from "../../common/dtos/Admin/DisableDto";

const token = AuthService.getAccessToken()

export const AdminService = {
  getAllUser: async (): Promise<AppUser[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  searchUser: async (dto: SearchUserDto): Promise<AppUser[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchUser`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const appUser: AppUser[] = response.data;
    return appUser;
  },

  updateStatus: async (dto: DisableDto): Promise<AppUser[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateStatus`,dto, 
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const appUsers: AppUser[] = response.data;
      return appUsers;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },  
};
