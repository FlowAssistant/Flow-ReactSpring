import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
import axios from "axios";
import styles from "./Signup.module.css"; // CSS 모듈 import

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/register", { username, password, name, email });
            alert("회원가입 성공!");
            navigate("/login"); // /login 페이지로 이동
        } catch (err) {
            const errorMessage = err.response?.data?.error || "회원가입 중 오류가 발생했습니다.";
            setError(errorMessage);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <form onSubmit={handleSignup} className={styles.signupForm}>
                <h3 className={styles.signupTitle}>회원가입</h3>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>아이디:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>이름:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>이메일:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.formInput}
                        required
                    />
                </div>
                {error && <p className={styles.formError}>{error}</p>}
                <button type="submit" className={styles.formButton}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Signup;
