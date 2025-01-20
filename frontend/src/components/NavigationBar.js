import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import logo from "../assets/images/flow-logo.png";

function NavigationBar({ username, handleLogout }) {
    return (
                <nav className="navigation-bar">
                <div className="app-title">
                    <img src={logo} alt="Flow Logo" className="app-logo"/>
                </div>
                <div className="nav-links">
            {username ? (
                <>
                <Link to="/morning-checkin">아침 체크인</Link>
                <Link to="/midday-boost">중간 체크</Link>
                <Link to="/evening-reflection">저녁 회고</Link>
                <button onClick={handleLogout} className="logout-button">
                로그아웃
            </button> {/* 로그아웃 버튼 추가 */}
        </>
    ) : (
        <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
        </>
    )}
</div>
</nav>
);
}

export default NavigationBar;
