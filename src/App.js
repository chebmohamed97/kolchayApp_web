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
import NewAdPage from "./pages/NewAdPage";
import ChatPage from "./pages/ChatPage";
import PageRegion from "./pages/pageRegion";
import TestPage from "./pages/testPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import MesAnnonces from "./pages/MesAnnonces";
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
          <Route path="/newad" element={<NewAdPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/:region" element={<PageRegion />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/mesannonces" element={<MesAnnonces />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
