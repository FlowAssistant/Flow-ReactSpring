import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", { username, password });
            setUser(username);
            alert("로그인 성공!");
            navigate("/profile");
        } catch (err) {
            console.error("로그인 실패", err);
            setError("로그인에 실패했습니다.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.formGroup}>
                <h2 className={styles.loginTitle}>로그인</h2>
                <input
                    className={styles.loginInput}
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className={styles.loginInput}
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.loginButton} onClick={handleLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
}

export default Login;
