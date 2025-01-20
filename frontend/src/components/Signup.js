import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/register", { username, password });
            alert("회원가입 성공!");
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessages = Object.values(err.response.data).join(" ");
                setError(errorMessages);
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup} className="signup-form">
                <div className="form-group">
                    <h3>회원가입</h3>
                    <label className="form-label">사용자 이름:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="form-button">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;
