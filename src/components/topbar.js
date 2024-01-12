import React from "react";
import items from "../data/sidebar.json";
import TopbarItem from "./topbarItem";

export default function Topbar() {
  return (
    <div className="topbar">
      {items.map((item, index) => (
        <TopbarItem key={item.id || index} item={item} />
      ))}
    </div>
  );
}
