import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css"; // CSS 모듈 import

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/register", { username, password });
            alert("회원가입 성공!");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
            setError(errorMessage);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <form onSubmit={handleSignup} className={styles.signupForm}>
                <h3 className={styles.signupTitle}>회원가입</h3>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>사용자 이름:</label>
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
                {error && <p className={styles.formError}>{error}</p>}
                <button type="submit" className={styles.formButton}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Signup;
