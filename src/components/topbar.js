import React from "react";
import items from "../data/sidebar.json";
import TopbarItem from "./topbarItem";
import { useAuth } from "../contexts/AuthContext";

export default function Topbar() {
  const { isLoggedIn, login, logout, currentUser } = useAuth();

  const loginItem = {
    title: "Login",
    icon: "bi-box-arrow-right",
    path: "/login",
  };

  const logOutItem = {
    title: "Logout",
    icon: "bi-box-arrow-left",
    path: "/logout",
  };

  return (
    <div className="topbar">
      {items.map((item, index) => (
        <TopbarItem key={item.id || index} item={item} />
      ))}
      {isLoggedIn ? (
        <TopbarItem item={logOutItem} />
      ) : (
        <TopbarItem item={loginItem} />
      )}
    </div>
  );
}
