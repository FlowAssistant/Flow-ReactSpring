import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import logo from "../assets/images/flow-logo.png";
import iconProfileDefault from "../assets/images/iconProfileDefault.png"; // 프로필 이미지 경로

function NavigationBar({ username, handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navigationBar}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Flow Logo" className={styles.appLogo} />
                <span className={styles.appTitle}>Flow</span>
            </div>
            <div className={styles.navLinks}>
                {username ? (
                    <>
                        {/* 프로필 아이콘 */}
                        <Link to="/profile" className={styles.profileLink}>
                            <img
                                src={iconProfileDefault}
                                alt="프로필"
                                className={styles.profileImage}
                            />
                        </Link>

                        {/* 햄버거 메뉴 */}
                        <div className={styles.hamburgerContainer}>
                            <button
                                className={styles.hamburgerButton}
                                onClick={toggleMenu}
                            >
                                &#9776; {/* 줄 3개 아이콘 */}
                            </button>
                            {isMenuOpen && (
                                <div className={styles.dropdownMenu}>
                                    <Link to="/morning-checkin" className={styles.dropdownLink}>
                                        아침 체크인
                                    </Link>
                                    <Link to="/midday-boost" className={styles.dropdownLink}>
                                        중간 체크
                                    </Link>
                                    <Link to="/evening-reflection" className={styles.dropdownLink}>
                                        저녁 회고
                                    </Link>
                                    <button className={styles.dropdownLink} onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* 비인증 사용자 */}
                        <Link to="/login" className={styles.navLink}>
                            로그인
                        </Link>
                        <Link to="/signup" className={styles.navLink}>
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar;
