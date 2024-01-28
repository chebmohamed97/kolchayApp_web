import React, { useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatsInPage from "../components/chat-components/ChatsInPage";
import "../components/chat-components/stylesChat.scss";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "../components/chat-components/Chat";
import { useNavigate, useLocation } from "react-router-dom";

export default function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const combinedId = location.state?.combinedId;
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);
  const { isLoggedIn, currentUser, userInfo } = useAuth();

  useEffect(() => {
    if (userData && combinedId) {
      const payload = {
        uid: userData.uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      };
      dispatch({ type: "CHANGE_USER", payload: payload });
    }

    console.log(data.chatId);
  }, []);

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div className="home">
      <div className="container">
        {data.chatId === "null" ? <ChatsInPage /> : <Chat />}
      </div>
    </div>
  );
}
