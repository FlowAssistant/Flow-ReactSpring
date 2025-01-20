import React, { useState } from "react";
import axios from "axios";
import styles from "./MorningCheckIn.module.css";

function MorningCheckIn({ username }) {
    const [response, setResponse] = useState("");
    const [logs, setLogs] = useState([]);

    const handleCheckIn = async (emotion) => {
        try {
            const result = await axios.post("/api/morning-checkin", {
                username: username,
                emotion: emotion,
            });
            setResponse(result.data.recommendedActivity);
            setLogs((prevLogs) => [...prevLogs, { emotion, activity: result.data.recommendedActivity }]);
        } catch (error) {
            console.error(error);
            setResponse("오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>아침 체크인</h2>
            <p>오늘의 기분을 선택하세요:</p>
            <div className={styles.buttonGroup}>
                {["행복", "슬픔", "피곤함", "신남", "중립"].map((emotion) => (
                    <button
                        key={emotion}
                        className={styles.button}
                        onClick={() => handleCheckIn(emotion)}
                    >
                        {emotion}
                    </button>
                ))}
            </div>
            {response && (
                <div className={styles.response}>
                    <h3>추천 활동</h3>
                    <p>{response}</p>
                </div>
            )}
            {logs.length > 0 && (
                <div className={styles.logs}>
                    <h3>테스트 로그</h3>
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index}>
                                사용자: {username}, 기분: {log.emotion} - 추천 활동: {log.activity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MorningCheckIn;
