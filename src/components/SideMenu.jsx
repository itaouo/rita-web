import React, { useState, useEffect } from 'react';
import { FaUser, FaTools, FaRocket, FaBriefcase, FaGraduationCap, FaGithub, FaEnvelope, FaBars } from 'react-icons/fa';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL
const EMAIL = import.meta.env.VITE_EMAIL
import avatarImg from '../assets/avatar.png';
import './SideMenu.css';

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  // 滾動監聽函數 - 只在電腦版啟用
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return; // 只在電腦版啟用

      const sections = ['about', 'skills', 'projects', 'experiences'];
      const scrollPosition = window.scrollY + 100; // 加上一些偏移來提前觸發

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化時執行一次

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'about', label: 'About Me', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'projects', label: 'Projects', icon: <FaRocket /> },
    { id: 'experiences', label: 'Experiences', icon: <FaBriefcase /> },
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);

    // 在手機版時隱藏side-menu
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }

    // 滾動到對應區域，根據設備調整偏移
    const sectionElement = document.getElementById(itemId);
    if (sectionElement) {
      let offset = 15; // 電腦版的偏移

      // 手機版額外偏移30px，避免被navbar擋到
      if (window.innerWidth <= 768) {
        offset = 75; // 15px + 60px(navbar高度) + 額外的間距
      }

      const offsetTop = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    console.log(`選中菜單項目: ${itemId}`);
  };

  return (
    <>
      {/* 手機板頂部導航欄 */}
        <nav className={`mobile-navbar ${isMobileMenuOpen ? 'navbar-hidden' : 'navbar-visible'}`}>
          <div className="navbar-content">
            <span className="navbar-user-name">Rita Huang</span>
            <button
              className="navbar-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              title="Show Menu"
            >
              <FaBars />
            </button>
          </div>
        </nav>

      <div className={`side-menu ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : 'mobile-closed'}`}>
        {/* 手機板菜單按鈕 */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          title={isMobileMenuOpen ? 'Hide Menu' : 'Show Menu'}
        >
          <FaBars />
        </button>

      {/* 用戶個人資料區域 */}
      <div className="user-profile">
        <div className="profile-avatar">
          <img src={avatarImg} alt="用戶頭像" />
        </div>
        {!isCollapsed && (
          <div className="profile-info">
            <div className="profile-name">Rita Huang</div>
            <div className="social-links">
              <button
                className="social-btn"
                title="GitHub"
                onClick={() => window.open(GITHUB_URL, '_blank')}
              >
                <FaGithub />
              </button>
              <button
                className="social-btn"
                title="Mail"
                onClick={() => window.open(`mailto:${EMAIL}`, '_blank')}
              >
                <FaEnvelope />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 菜單項目 */}
      <nav className="menu-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <button
                className={`menu-button ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <span className="menu-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 底部版權區域 */}
      <div className="menu-footer">
        {!isCollapsed && (
          <div className="copyright-info">
            <span className="copyright-text">© 2025 RITA</span>
            <span className="copyright-subtext">All rights reserved</span>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SideMenu;
