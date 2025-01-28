import React, { useState } from "react";
import axios from "axios";
import styles from "./MorningCheckIn.module.css";


const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


function MorningCheckIn({ username }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState([]);
    const [finalResponse, setFinalResponse] = useState("");

    const questions = [
        {
            question: "지금 느끼는 감정을 하나 골라주세요.",
            options: [
                { label: "기쁜", icon: "fas fa-smile-beam", color: "text-yellow-400" },
                { label: "설레는", icon: "fas fa-heart", color: "text-pink-400" },
                { label: "평범한", icon: "fas fa-meh", color: "text-gray-400" },
                { label: "놀란", icon: "fas fa-surprise", color: "text-red-400" },
                { label: "불쾌한", icon: "fas fa-frown", color: "text-purple-400" },
                { label: "두려운", icon: "fas fa-dizzy", color: "text-green-600" },
                { label: "슬픈", icon: "fas fa-sad-tear", color: "text-blue-400" },
                { label: "화나는", icon: "fas fa-angry", color: "text-red-500" },
            ],
        },
        {
            question: "오늘 하루 가장 중요하게 생각하는 목표는 무엇인가요?",
            options: [
                { label: "성과 달성", icon: "fas fa-trophy", color: "text-yellow-500" },
                { label: "스트레스 해소", icon: "fas fa-cloud-sun", color: "text-blue-400" },
                { label: "사람들과의 교류", icon: "fas fa-users", color: "text-green-500" },
                { label: "자기 계발", icon: "fas fa-lightbulb", color: "text-purple-500" },
                { label: "휴식", icon: "fas fa-bed", color: "text-gray-500" },
            ],
        },
        {
            question: "하루 중 에너지가 가장 많이 필요한 순간은 언제인가요?",
            options: [
                { label: "오전", icon: "fas fa-coffee", color: "text-yellow-500" },
                { label: "점심", icon: "fas fa-utensils", color: "text-red-400" },
                { label: "오후", icon: "fas fa-sun", color: "text-orange-400" },
                { label: "저녁", icon: "fas fa-cloud-moon", color: "text-purple-400" },
                { label: "밤", icon: "fas fa-moon", color: "text-blue-500" },
            ],
        },
        {
            question: "오늘 자신에게 해주고 싶은 응원 메시지는 무엇인가요?",
            options: [
                { label: "잘 하고 있어!", icon: "fas fa-thumbs-up", color: "text-green-500" },
                { label: "괜찮아, 천천히 해도 돼!", icon: "fas fa-hand-holding-heart", color: "text-blue-400" },
                { label: "모든 건 다 지나갈 거야.", icon: "fas fa-clock", color: "text-gray-500" },
                { label: "오늘도 빛나길!", icon: "fas fa-star", color: "text-yellow-400" },
                { label: "너는 충분히 멋져!", icon: "fas fa-heart", color: "text-pink-400" },
            ],
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
            <h2 className={styles.title}>오늘 하루를 시작해볼까요?</h2>
            {finalResponse ? (
                <div className={styles.finalResponse}>
                    <h3>오늘의 추천 활동</h3>
                    <p>{finalResponse}</p>
                </div>
            ) : (
                <div className={styles.questionContainer}>
                    <p className={styles.question}>{questions[currentStep].question}</p>
                    <div className={styles.options}>
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option.label}
                                className={`${styles.optionButton} flex items-center gap-3`}
                                onClick={() => handleOptionClick(option.label)}
                            >
                                <i className={`${option.icon} ${option.color} text-xl`}></i>
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MorningCheckIn;
