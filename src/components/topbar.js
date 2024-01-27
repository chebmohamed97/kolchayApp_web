import React from "react";
import TopbarItem from "./topbarItem";

export default function Topbar() {
  const items = [
    {
      title: "Home",
      icon: "bi-house-fill",
      path: "/",
    },
    {
      title: "Categories",
      icon: "bi-app-indicator",
      path: "/categories",
    },
    {
      title: "Messages",
      icon: "bi-chat-dots",
      path: "/messages",
    },
  ];
  return (
    <div className="topbar">
      {items.map((item, index) => (
        <TopbarItem key={item.id || index} item={item} />
      ))}
    </div>
  );
}
