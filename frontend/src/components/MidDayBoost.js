import React, { useState } from "react";
import axios from "axios";
import styles from "./MidDayBoost.module.css";

function MidDayBoost({ username }) {
    const [currentStep, setCurrentStep] = useState(0); // 현재 질문 단계
    const [responses, setResponses] = useState([]); // 사용자 응답 저장
    const [feedback, setFeedback] = useState(null);
    const questions = [
        { question: "현재 기분은 어떤가요?", options: ["행복", "슬픔", "피곤함", "신남", "중립"] },
        { question: "지금 하고 싶은 활동은 무엇인가요?", options: ["산책", "운동", "독서", "휴식", "기타"] },
        { question: "오늘 목표는 무엇인가요?", options: ["완벽히 해내기", "천천히 즐기기", "중립"] },
    ];

    const handleResponse = (option) => {
        setResponses((prev) => [...prev, option]);
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            submitResponses();
        }
    };

    const submitResponses = async () => {
        try {
            const result = await axios.post("/api/midday-boost", {
                username: username,
                responses: responses,
            });
            setFeedback(result.data.feedback);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>중간 체크</h2>
            {feedback ? (
                <div className={styles.feedback}>
                    <h3>AI 피드백:</h3>
                    <p>{feedback}</p>
                </div>
            ) : (
                <div>
                    <p>{questions[currentStep].question}</p>
                    <div className={styles.buttonGroup}>
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option}
                                className={styles.button}
                                onClick={() => handleResponse(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MidDayBoost;
