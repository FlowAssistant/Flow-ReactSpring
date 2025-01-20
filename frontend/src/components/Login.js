import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
            // 간단한 인증 처리
            setUser(username);
            localStorage.setItem("user", username); // 상태를 유지
            navigate("/morning-checkin"); // 로그인 후 이동
        } else {
            setError("아이디와 비밀번호를 입력해주세요.");
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            {error && <p className="error-message">{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>로그인</button>
            </div>
        </div>
    );
}

export default Login;
