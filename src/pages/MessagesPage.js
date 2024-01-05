import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const MessagesPage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default MessagesPage;
