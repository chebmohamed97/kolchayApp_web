import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PageAnnonce from "./pages/pageAnnonce";
import Register from "./pages/Register";
import MessagesPage from "./pages/MessagesPage";
import WebsiteHeader from "./components/websiteHeader";
import LogoutPage from "./pages/LogoutPage";

function App() {
  return (
    <Router>
      <WebsiteHeader />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/annonce/:id" element={<PageAnnonce />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
