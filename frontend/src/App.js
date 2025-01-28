import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MorningCheckIn from "./components/MorningCheckIn";
import MidDayBoost from "./components/MidDayBoost";
import EveningReflection from "./components/EveningReflection";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard"; // Dashboard 추가
import axios from "axios";
import "./App.css";
import YutnoriWrap from "./components/YutnoriGame";
import YutnoriGame from "./components/YutnoriGame";
import HappinessTracker from "./components/HappinessTracker";
import ChatBot from "./components/ChatBot";

function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || ""); // username 상태
    const [profileImageUrl, setProfileImageUrl] = useState(""); // 프로필 이미지 URL 상태

    // 프로필 정보 가져오기 (실패 시 로그아웃 처리)
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (username) {
                try {
                    const response = await axios.get(`/api/users/${username}`);
                    const profileImageUrlWithTimestamp = `${response.data.profileImageUrl}?timestamp=${new Date().getTime()}`;
                    setProfileImageUrl(profileImageUrlWithTimestamp);
                } catch (error) {
                    console.error("Failed to fetch profile image", error);
                    handleLogout(); // API 호출 실패 시 로그아웃 처리
                }
            }
        };

        fetchUserProfile();
    }, [username]);

    // 로그인 핸들러
    const handleLogin = (username) => {
        setUsername(username);
        localStorage.setItem("username", username);
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        setUsername("");
        setProfileImageUrl("");
        localStorage.removeItem("username");
    };

    // 현재 시간 기반 컴포넌트 결정
    const getTimeBasedComponent = () => {
        const hour = new Date().getHours();
        if (hour < 12) return <MorningCheckIn username={username} />;
        if (hour < 18) return <MidDayBoost username={username} />;
        return <EveningReflection username={username} />;
    };

    return (
        <Router>
            <div className="app-container">
                {/* 상태를 NavigationBar에 전달 */}
                <NavigationBar
                    username={username}
                    profileImageUrl={profileImageUrl}
                    handleLogout={handleLogout}
                />
                <Routes>
                    {/* Dashboard는 별도 경로로 추가 */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chatbot"
                        element={
                            <ProtectedRoute>
                                <ChatBot />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/event"
                        element={
                            <ProtectedRoute>
                                <YutnoriGame />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tracker"
                        element={
                            <ProtectedRoute>
                                <HappinessTracker />
                            </ProtectedRoute>
                        }
                    />
                    {/* 시간대별 컴포넌트 */}
                    <Route
                        path="/checkin"
                        element={
                            <ProtectedRoute>
                                {getTimeBasedComponent()}
                            </ProtectedRoute>
                        }
                    />
                    {/* 프로필 페이지 */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile
                                    username={username}
                                    setProfileImageUrl={setProfileImageUrl} // 상태 업데이트 함수 전달
                                />
                            </ProtectedRoute>
                        }
                    />
                    {/* 로그인 및 회원가입 */}
                    <Route path="/login" element={<Login setUser={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* 기타 경로는 기본으로 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
