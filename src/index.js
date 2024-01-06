import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { DeviceWidthProvider } from "./contexts/WidthContext";
import { AuthContextProvider } from "./contexts/authContextChat";
import { ChatContextProvider } from "./contexts/ChatContext";
ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <AuthProvider>
          <DeviceWidthProvider>
            <App />
          </DeviceWidthProvider>
        </AuthProvider>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
