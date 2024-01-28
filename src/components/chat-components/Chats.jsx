import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContextChat";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {});
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  useEffect(() => {
    console.log(currentUser.uid)
    console.log(chats)
  }, [chats]);

  return (
    <div> {Object.entries(chats).length === 0 ?<p className="boldCenteredText">Vous n'avez pas de conversations pour le moment</p> : <div className="chats">
    {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
      <div
        className="userChat"
        key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}
      >
        <div className="userChatInfo">
          {chat[1].userInfo?.displayName ? (
            <>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </>
          ) : (
            <p>No user info available</p>
          )}
        </div>
      </div>
    ))}
  </div> }</div>
    
  );
};

export default Chats;
