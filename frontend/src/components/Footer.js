import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("checkin");

    const handleNavigation = (menu) => {
        setActiveMenu(menu);
        navigate(`/${menu}`);
    };

    return (
        <footer className="footer">
            {/* 시간대별 체크인 */}
            <div
                onClick={() => handleNavigation("checkin")}
                className={`btn-menu ${activeMenu === "checkin" ? "active" : ""}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke={activeMenu === "checkin" ? "#000" : "#FFF"} strokeWidth="2" />
                            <path d="M9 12l2 2 4-4" stroke={activeMenu === "checkin" ? "#000" : "#FFF"} strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <span>체크인</span>
                </div>
            </div>

            {/* AI 피드백 */}
            <div
                onClick={() => handleNavigation("feedback")}
                className={`btn-menu ${activeMenu === "feedback" ? "active" : ""}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke={activeMenu === "feedback" ? "#000" : "#FFF"} strokeWidth="2" />
                            <circle cx="9" cy="10" r="1" fill={activeMenu === "feedback" ? "#000" : "#FFF"} />
                            <circle cx="15" cy="10" r="1" fill={activeMenu === "feedback" ? "#000" : "#FFF"} />
                            <path d="M9 14h6" stroke={activeMenu === "feedback" ? "#000" : "#FFF"} strokeWidth="1.5" />
                        </svg>
                    </div>
                    <span>AI 피드백</span>
                </div>
            </div>

            {/* 프로필 */}
            <div
                onClick={() => handleNavigation("profile")}
                className={`btn-menu ${activeMenu === "profile" ? "active" : ""}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="4" stroke={activeMenu === "profile" ? "#000" : "#FFF"} strokeWidth="2" />
                            <path d="M6 18c1.5-4 9-4 12 0" stroke={activeMenu === "profile" ? "#000" : "#FFF"} strokeWidth="2" />
                        </svg>
                    </div>
                    <span>프로필</span>
                </div>
            </div>

            {/* 성장 분석 */}
            <div
                onClick={() => handleNavigation("growth")}
                className={`btn-menu ${activeMenu === "growth" ? "active" : ""}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18l4-8 4 6 4-10" stroke={activeMenu === "growth" ? "#000" : "#FFF"} strokeWidth="2" />
                        </svg>
                    </div>
                    <span>분석</span>
                </div>
            </div>

            {/* 일일 요약 */}
            <div
                onClick={() => handleNavigation("summary")}
                className={`btn-menu ${activeMenu === "summary" ? "active" : ""}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M6 8h12M6 12h8M6 16h4" stroke={activeMenu === "summary" ? "#000" : "#FFF"} strokeWidth="2" />
                        </svg>
                    </div>
                    <span>일일 요약</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
