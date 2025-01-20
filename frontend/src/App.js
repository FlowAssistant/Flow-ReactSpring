import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MorningCheckIn from "./components/MorningCheckIn";
import MidDayBoost from "./components/MidDayBoost";
import EveningReflection from "./components/EveningReflection";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
    const [username, setUsername] = useState(null);

    // 로그아웃 처리 함수
    const handleLogout = () => {
        setUsername(null); // 사용자 상태 초기화
    };

    return (
        <Router>
            <div className="app-container">
                <NavigationBar username={username} handleLogout={handleLogout} /> {/* 로그아웃 핸들러 전달 */}
                <Routes>
                    {!username ? (
                        <>
                            <Route path="/login" element={<Login setUser={setUsername} />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/morning-checkin" element={<MorningCheckIn username={username} />} />
                            <Route path="/midday-boost" element={<MidDayBoost username={username} />} />
                            <Route path="/evening-reflection" element={<EveningReflection username={username} />} />
                            <Route path="*" element={<Navigate to="/morning-checkin" />} />
                        </>
                    )}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
