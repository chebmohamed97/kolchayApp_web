import React, { useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatsInPage from "../components/chat-components/ChatsInPage";
import "../components/chat-components/stylesChat.scss";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "../components/chat-components/Chat";
import { useNavigate } from "react-router-dom";
export default function TestPage() {
  const navigate = useNavigate();
  const { data } = useContext(ChatContext);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log(data.chatId);
  }, [data]);

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
