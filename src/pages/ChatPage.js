import React from "react";
import Sidebar from "../components/chat-components/Sidebar";
import Chat from "../components/chat-components/Chat";
import { useAuth } from "../contexts/AuthContext";

const ChatPage = () => {
  const { isLoggedIn, currentUser } = useAuth();

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
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
