import React, { useState } from "react";
import axios from "axios";
import styles from "./MorningCheckIn.module.css";

// 환경 변수에서 OpenAI API 키 가져오기
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
            const messages = [
                {
                    role: "system",
                    content: `당신은 간결하고 실용적인 활동 추천을 제공하는 도우미입니다. 사용자의 응답을 바탕으로 적합한 활동을 추천해주세요. 불필요한 문구("알겠습니다" 등)는 포함하지 말고, 
                    아래와 같은 형식을 따르세요: "오늘은 ~~하는 것을 추천드립니다." 형식으로 활동 추천을 시작하세요. 이어서 "또한, ~~와 같은 활동도 좋습니다." 형식으로 대안을 추가하세요.마지막에는 짧고 긍정적인 임의의 응원 메시지를 적어주세요. 답변 시 여러 문단으로 구분하고, 각 문단 끝에는 줄바꿈을 해주세요. 답변은 150자를 초과하지 말고 간결하게 작성하세요.`,
                },
                {
                    role: "user",
                    content: `사용자 이름: ${username}\n\n응답 목록:\n${allResponses
                        .map((response, index) => `${index + 1}. ${response}`)
                        .join("\n")}\n\n이 응답 데이터를 바탕으로 오늘 추천할 적합한 활동과 도움이 될만한 응원 메시지를 작성해주세요.`,
                },
            ];


            const result = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: messages,
                    max_tokens: 150, // 답변 길이 제한
                    temperature: 0.7, // 다양성 조절
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );

            setFinalResponse(result.data.choices[0].message.content.trim());
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
