import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CreateUserDto, UserCredentialDto } from "../../common/dtos";
import { UserRole } from "../../common/enums";
import { AppUser } from "../../interfaces";

export const AuthService = {
  isLogin: (): boolean => {
    return localStorage.getItem("accessToken") ? true : false;
  },
  getAccessToken: (): string => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    return AuthService.isTokenExpired(accessToken) ? "" : accessToken;
  },
  getCurrentUser: () => {
    const userJson = localStorage.getItem("user");
    return userJson !== null && AuthService.getAccessToken().length !== 0
      ? (JSON.parse(userJson) as AppUser)
      : null;
  },
  isTokenExpired: (token: string): boolean => {
    if (token.length == 0) {
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
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
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },
};
