import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatsInPage from "../components/chat-components/ChatsInPage";
import "../components/chat-components/styles.scss";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "../components/chat-components/Chat";

export default function TestPage() {
  const { data } = useContext(ChatContext);
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    console.log(data.chatId);
  }, [data]);
  if (!isLoggedIn) {
    return (
      <div>
        <h2>Log in to chat</h2>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        {data.chatId === "null" ? <ChatsInPage /> : <Chat />}
      </div>
    </div>
  );
}
