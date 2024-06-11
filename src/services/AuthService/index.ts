import axios from "axios";
import { ChangePassworddto, CreateUserDto, UserCredentialDto } from "../../common/dtos";
import { UserRole } from "../../common/enums";
import { AppUser } from "../../interfaces";
import { ForgetPasswordDto } from "../../common/dtos/ForgetPassword/ForgetPasswordDto";

export const AuthService = {
  

  isLogin: (): boolean => {
    return localStorage.getItem("accessToken") ? true : false;
  },
  getAccessToken: (): string => {
    return localStorage.getItem("accessToken") ?? "";
  },
  getCurrentUser: () => {
    const userJson = localStorage.getItem("user");
    return userJson !== null ? (JSON.parse(userJson) as AppUser) : null;
  },
  login: async (dto: UserCredentialDto) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Auth/Login`,
      dto
    );
    localStorage.setItem("accessToken", response.data.accessToken.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.appUser));
  },
  googleLogin: async (idToken: string, userRole: UserRole) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Auth/GoogleSignIn`,
      {
        idToken,
        userRole,
      }
    );
    localStorage.setItem("accessToken", response.data.accessToken.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.appUser));
  },
  signup: async (dto: CreateUserDto) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Auth/Signup`,
      dto
    );
    localStorage.setItem("accessToken", response.data.accessToken.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.appUser));
    return { accessToken: response.data.accessToken.accessToken, user: response.data.appUser};
  },
  logout: () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
  },
  ForgetPassword : async (dto :ForgetPasswordDto)=>{
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Auth/ForgetPassWord`,
      dto
    );

  },
  ChangePassword : async (dto :ChangePassworddto, accessToken: string)=>{
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/Auth/ChangePassWord`,
      dto,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
  }
};