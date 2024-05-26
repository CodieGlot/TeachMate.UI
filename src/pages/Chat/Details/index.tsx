import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { Navbar } from "../Navbar";
import { useChatAuth } from "../../../context/ChatAuthContext";
import { ChatEngineService } from "../../../services";
import { Loading } from "../../../components";

export function Details() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userContext = useChatAuth();
  const user = userContext ? userContext.user : null;

  const handleCreateUser = async () => {
    if (user) {
      try {
        const formData = new FormData();
        formData.append("email", user.email as string);
        formData.append("username", user.email as string);
        formData.append("secret", user.uid as string);

        const userAvatar = await ChatEngineService.getUserAvatar(
          user.photoURL as string
        );
        formData.append("avatar", userAvatar, userAvatar.name);

        await ChatEngineService.createUser(formData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user) {
        navigate("/chat");
        return;
      }

      try {
        const response = await ChatEngineService.getCurrentUser(
          user as firebase.User
        );
        console.log(response);
        setLoading(false);
      } catch (error) {
        await handleCreateUser();
      }
    };

    fetchCurrentUser();
  }, [user]);

  return (
    <>
      <Navbar />
      {loading && Loading}
    </>
  );
}
