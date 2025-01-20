import React, { useState } from "react";
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
import "./App.css";

function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    const handleLogin = (username) => {
        setUsername(username);
        localStorage.setItem("username", username);
    };

    const handleLogout = () => {
        setUsername("");
        localStorage.removeItem("username");
    };

    return (
        <Router>
            <div className="app-container">
                <NavigationBar username={username} handleLogout={handleLogout} />
                <Routes>
                    {/* 로그인 및 회원가입 */}
                    <Route path="/login" element={<Login setUser={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* 보호된 경로 */}
                    <Route
                        path="/morning-checkin"
                        element={
                            <ProtectedRoute>
                                <MorningCheckIn username={username} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/midday-boost"
                        element={
                            <ProtectedRoute>
                                <MidDayBoost username={username} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/evening-reflection"
                        element={
                            <ProtectedRoute>
                                <EveningReflection username={username} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile username={username} />
                            </ProtectedRoute>
                        }
                    />

                    {/* 기본 경로 */}
                    <Route path="*" element={<Navigate to="/morning-checkin" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
