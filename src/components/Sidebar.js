// Sidebar.js
import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import SidebarItemOnlyLogo from './SideBarItemsOnlyLogo';
import items from '../data/sidebar.json';
import LogoImage from '../images/logo192.png';
import { FaBars } from 'react-icons/fa';
import '../styles/sidebar.css'

export default function Sidebar() {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sidebar ${isFixed ? 'fixed' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-sidebar">
        <img
          src={LogoImage}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Your Logo"
        />
      </div>
      {isCollapsed ? (
        // Render content for collapsed sidebar
        items.map((item, index) => (
          <SidebarItemOnlyLogo key={index} item={item} />
        ))
      ) : (
        // Render content for expanded sidebar
        items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))
      )}
      <div className="collapse-toggle" onClick={toggleCollapse}>
        <FaBars />
      </div>
    </div>
  );
}
