import React, { useState } from "react";
import axios from "axios";
import styles from "./MidDayBoost.module.css";

function MidDayBoost({ username }) {
    const [emotion, setEmotion] = useState("");
    const [feedback, setFeedback] = useState(null);

    const handleBoost = async () => {
        try {
            const result = await axios.post("/api/midday-boost", {
                username: username,
                emotion: emotion,
            });
            setFeedback(result.data.feedback);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>중간 체크</h2>
            <p>현재 기분을 선택하세요:</p>
            <div className={styles.buttonGroup}>
                {["행복", "슬픔", "피곤함", "신남", "중립"].map((emotion) => (
                    <button
                        key={emotion}
                        className={styles.button}
                        onClick={() => setEmotion(emotion)}
                    >
                        {emotion}
                    </button>
                ))}
            </div>
            <button onClick={handleBoost} className={styles.submitButton}>
                중간 체크 시작
            </button>
            {feedback && (
                <div className={styles.response}>
                    <h3>AI 피드백:</h3>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
}

export default MidDayBoost;
