import React, { useState } from "react";
import axios from "axios";
import styles from "./EveningReflection.module.css";

function EveningReflection({ username }) {
    const [reflection, setReflection] = useState("");
    const [response, setResponse] = useState(null);

    const handleReflection = async () => {
        try {
            const result = await axios.post("/api/evening-reflection", {
                username: username,
                reflection: reflection,
            });
            setResponse(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>저녁 회고</h2>
            <div className={styles.inputGroup}>
                <label className={styles.label}>오늘 하루를 돌아보며 한 마디로 표현해 보세요:</label>
                <textarea
                    className={styles.textarea}
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="예: 오늘은 스트레스가 많았지만 뿌듯한 하루였어요."
                />
            </div>
            <button onClick={handleReflection} className={styles.submitButton}>
                피드백 받기
            </button>
            {response && (
                <div className={styles.response}>
                    <h3>피드백:</h3>
                    <p>{response.feedback}</p>
                </div>
            )}
        </div>
    );
}

export default EveningReflection;
