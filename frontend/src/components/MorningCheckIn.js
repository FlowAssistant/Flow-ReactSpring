import React, { useState } from "react";
import axios from "axios";
import styles from "./MorningCheckIn.module.css";

function MorningCheckIn({ username }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState([]);
    const [finalResponse, setFinalResponse] = useState("");

    const questions = [
        {
            question: "오늘 아침 기분은 어떤가요?",
            options: ["행복", "슬픔", "피곤함", "신남", "중립"],
        },
        {
            question: "오늘 가장 집중하고 싶은 건 무엇인가요?",
            options: ["일/학업", "운동", "휴식", "친구와의 대화", "기타"],
        },
        {
            question: "어제 가장 즐거웠던 활동은 무엇인가요?",
            options: ["영화/드라마 감상", "독서", "산책", "음악 감상", "기타"],
        },
        {
            question: "오늘 예상되는 에너지 레벨은?",
            options: ["높음", "보통", "낮음"],
        },
        {
            question: "오늘 하루 동안 달성하고 싶은 목표는?",
            options: ["완벽히 해내기", "작은 진전이라도", "그냥 여유롭게"],
        },
    ];

    const handleOptionClick = (response) => {
        setResponses((prev) => [...prev, response]);
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleFinalSubmit([...responses, response]);
        }
    };

    const handleFinalSubmit = async (allResponses) => {
        try {
            const result = await axios.post("/api/morning-checkin", {
                username: username,
                responses: allResponses,
            });
            setFinalResponse(result.data.recommendedActivity);
        } catch (error) {
            console.error(error);
            setFinalResponse("추천 활동을 불러오지 못했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>아침 체크인</h2>
            {finalResponse ? (
                <div className={styles.finalResponse}>
                    <h3>오늘의 추천 활동</h3>
                    <p>{finalResponse}</p>
                </div>
            ) : (
                <div className={styles.questionContainer}>
                    <p className={styles.question}>
                        {questions[currentStep].question}
                    </p>
                    <div className={styles.options}>
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option}
                                className={styles.optionButton}
                                onClick={() => handleOptionClick(option)}
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

export default MorningCheckIn;
