import React, { useState } from "react";
import styles from "./EveningReflection.module.css";

function EveningReflection({ username }) {
    const [step, setStep] = useState(0);
    const [responses, setResponses] = useState({});
    const [feedback, setFeedback] = useState(null);
    const [sliderValue, setSliderValue] = useState(5);

    const questions = [
        {
            question: "오늘 하루를 돌아보며 한 마디로 표현해 보세요",
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
            // 임의의 피드백 데이터를 추가합니다.
            const mockFeedback = {
                feedback: "오늘 하루 고생하셨습니다! 내일도 행복한 하루 되세요. 😊",
            };

            // 서버 요청 대신 임의 데이터를 설정
            setFeedback(mockFeedback.feedback);
        } catch (error) {
            console.error("Error submitting reflection:", error);
            setFeedback("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
    // 아래는 ai 연결시 구현
    // const handleSubmit = async () => {
    //     try {
    //         const result = await fetch("/api/evening-reflection", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ username, responses }),
    //         });
    //         const data = await result.json();
    //         setFeedback(data.feedback);
    //     } catch (error) {
    //         console.error("Error submitting reflection:", error);
    //     }
    // };

    const handleSliderChange = (e) => {
        const value = e.target.value;
        setSliderValue(value);
        document.documentElement.style.setProperty("--value", `${(value - 1) * 10}%`); // 게이지 값 제한
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>저녁 회고</h2>
            {feedback ? (
                <div className={styles.feedback}>
                    <h3>AI 피드백:</h3>
                    <p>{feedback}</p>
                    <button className={styles.finishButton} onClick={() => window.location.reload()}>
                        다시 시작하기
                    </button>
                </div>
            ) : (
                <div>
                    <p className={styles.question}>{questions[step].question}</p>
                    {questions[step].type === "text" && (
                        <>
                            <textarea
                                className={styles.textarea}
                                placeholder={questions[step].placeholder}
                                onBlur={(e) => setResponses((prev) => ({ ...prev, [questions[step].question]: e.target.value }))}
                            />
                            <button
                                className={styles.nextButton}
                                onClick={() => handleNext(responses[questions[step].question])}
                            >
                                다음
                            </button>
                        </>
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
                                value={sliderValue}
                                className={styles.slider}
                                onChange={handleSliderChange}
                            />
                            <p>현재 점수: {sliderValue}</p>
                            <button className={styles.nextButton} onClick={() => handleNext(sliderValue)}>
                                다음
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EveningReflection;
