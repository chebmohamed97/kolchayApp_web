import Sidebar from './components/Sidebar'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import Categories from './pages/Categories';
import ReportBug from './pages/Report-bug';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Login from './pages/loginPage';
import SignUp from './pages/Signup';
import Details from './pages/Details';
import PageAnnonce from './pages/pageAnnonce';
import LogInStatus from './components/logInStatus';
function App() {
  return (
    <Router>
    <div className="main">
      <Sidebar />
      <div className="container">
      <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/report-bug" element={<ReportBug />} />
            <Route path="/details" element={<Details />}/>

            <Route path="/annonce/:id" element={<PageAnnonce />} />
      </Routes>
      </div>
    </div>
    </Router>

  )
}

export default App