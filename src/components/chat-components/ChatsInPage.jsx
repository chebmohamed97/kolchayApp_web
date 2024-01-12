import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const ChatsInPage = () => {
  return (
    <div className="sidebar">
      <Search/>
      <Chats/>
    </div>
  );
};

export default ChatsInPage;
