import React from "react";

export default function RegionItem({ gouvernerat }) {
  return (
    <div className="regionItem">
      <a href={gouvernerat || "#"}>{gouvernerat}</a>
    </div>
  );
}
