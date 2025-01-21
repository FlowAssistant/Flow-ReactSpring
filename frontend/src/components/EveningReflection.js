import React, { useState } from "react";
import axios from "axios";
import styles from "./EveningReflection.module.css";

function EveningReflection({ username }) {
    const [step, setStep] = useState(0); // 현재 질문 단계
    const [responses, setResponses] = useState({}); // 사용자 응답 저장
    const [feedback, setFeedback] = useState(null);

    const questions = [
        {
            question: "오늘 하루를 돌아보며 한 마디로 표현해 보세요:",
            placeholder: "예: 오늘은 스트레스가 많았지만 뿌듯한 하루였어요.",
            type: "text",
        },
        {
            question: "오늘 가장 행복했던 순간은?",
            options: ["가족과 함께", "좋은 음식", "혼자만의 시간", "일/학업 성취", "기타"],
            type: "multiple-choice",
        },
        {
            question: "오늘 가장 힘들었던 일은?",
            options: ["피곤함", "스트레스", "의사소통 문제", "일/학업", "기타"],
            type: "multiple-choice",
        },
        {
            question: "오늘의 행복 점수는 몇 점인가요? (1-10)",
            type: "slider",
        },
    ];

    const handleNext = (response) => {
        setResponses((prev) => ({ ...prev, [questions[step].question]: response }));
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await axios.post("/api/evening-reflection", {
                username: username,
                responses: responses,
            });
            setFeedback(result.data.feedback);
        } catch (error) {
            console.error("Error submitting reflection:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>저녁 회고</h2>
            {feedback ? (
                <div className={styles.feedback}>
                    <h3>AI 피드백:</h3>
                    <p>{feedback}</p>
                </div>
            ) : (
                <div>
                    <p className={styles.question}>{questions[step].question}</p>
                    {questions[step].type === "text" && (
                        <textarea
                            className={styles.textarea}
                            placeholder={questions[step].placeholder}
                            onChange={(e) => handleNext(e.target.value)}
                        />
                    )}
                    {questions[step].type === "multiple-choice" && (
                        <div className={styles.options}>
                            {questions[step].options.map((option) => (
                                <button
                                    key={option}
                                    className={styles.optionButton}
                                    onClick={() => handleNext(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    {questions[step].type === "slider" && (
                        <div className={styles.sliderContainer}>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                className={styles.slider}
                                onChange={(e) => handleNext(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EveningReflection;
