import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("home");

    const handleNavigation = (menu) => {
        setActiveMenu(menu);
        navigate(`/${menu}`);
    };

    return (
        <footer className={styles.footer}>
            {/* 홈 */}
            <div
                onClick={() => handleNavigation("dashboard")}
                className={`${styles.menuItem} ${
                    activeMenu === "dashboard" ? styles.active : ""
                }`}
            >
                <i className={`fas fa-home ${styles.icon}`}></i>
                <span>홈</span>
            </div>

            {/* 채팅 */}
            <div
                onClick={() => handleNavigation("chat")}
                className={`${styles.menuItem} ${
                    activeMenu === "chat" ? styles.active : ""
                }`}
            >
                <i className={`fas fa-comments ${styles.icon}`}></i>
                <span>채팅</span>
            </div>

            {/* 체크인 */}
            <div
                onClick={() => handleNavigation("signup")}
                className={`${styles.menuItem} ${
                    activeMenu === "signup" ? styles.active : ""
                }`}
            >
                <i className={`fas fa-th-large ${styles.icon}`}></i>
                <span>체크인</span>
            </div>

            {/* 해석 */}
            <div
                onClick={() => handleNavigation("analysis")}
                className={`${styles.menuItem} ${
                    activeMenu === "analysis" ? styles.active : ""
                }`}
            >
                <i className={`fas fa-calendar-alt ${styles.icon}`}></i>
                <span>분석</span>
            </div>

            {/* 혜택 */}
            <div
                onClick={() => handleNavigation("event")}
                className={`${styles.menuItem} ${
                    activeMenu === "event" ? styles.active : ""
                }`}
            >
                <i className={`fas fa-gift ${styles.icon}`}></i>
                <span>이벤트</span>
            </div>
        </footer>
    );
};

export default Footer;
