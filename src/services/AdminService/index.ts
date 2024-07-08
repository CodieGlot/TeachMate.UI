import axios from "axios";
import { AppUser, Report } from "../../interfaces";
import { AuthService } from "../AuthService";
import { SearchUserDto, UpdateReportStatusDto, SearchReportSystemDto,  SearchReportUserDto} from "../../common/dtos";
import { DisableDto } from "../../common/dtos/Admin/DisableDto";
//import {  } from "../../common/dtos/Search/SearchReportSystemDto";

const token = AuthService.getAccessToken()

export const AdminService = {
  getAllUser: async (): Promise<AppUser[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllUser`,
      {
        headers: {
          Authorization: `Bearer ` + token,
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
          Authorization: `Bearer ` + token,
        }
      }
    );
    const appUser: AppUser[] = response.data;
    return appUser;
  },

  updateStatus: async (dto: DisableDto): Promise<AppUser[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateStatus`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
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

  getReportByID: async (id: number) : Promise<Report> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetReportByID?id=`+id,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    const report: Report = response.data;
    return report;
  },

  getAllReportSystem: async (): Promise<Report[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllReportSystem`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchReportSystem: async (dto: SearchReportSystemDto): Promise<Report[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchReportSystem`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const report: Report[] = response.data;
    return report;
  },

  getAllReportUser: async (): Promise<Report[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllReportUser`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchReportUser: async (dto: SearchReportUserDto): Promise<Report[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchReportUser`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const report: Report[] = response.data;
    return report;
  },

  updateStatusReport: async (dto: UpdateReportStatusDto): Promise<Report[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateStatusReport`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      const report: Report[] = response.data;
      return report;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },
};
