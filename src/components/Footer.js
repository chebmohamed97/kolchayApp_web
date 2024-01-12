import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <p>
        Copyright © {new Date().getFullYear()} KolChayy.tn. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
