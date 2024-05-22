import axios from "axios";
import firebase from "firebase/compat/app";
import { FileService } from "../FileService";

export const ChatEngineService = {
  getCurrentUser: async (user: firebase.User) => {
    return await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": "356aeaba-c0e6-4e69-9586-ea605064b7e5",
        "User-Name": user.email,
        "User-Secret": user.uid,
      },
    });
  },
  createUser: async (formData: FormData) => {
    await axios.post("https://api.chatengine.io/users/", formData, {
      headers: { "private-key": "e5f1839b-b2ad-4d26-be0e-a3412bece6d1" },
    });
  },
  getUserAvatar: async (photoUrl: string) => {
    return await FileService.fetchImage(photoUrl, "userAvatar.jpg");
  },
};
