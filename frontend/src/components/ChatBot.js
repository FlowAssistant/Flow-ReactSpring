import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBot.module.css";
import logo from "../assets/images/flow-logo.png";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ChatBot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);

        const initialMessage = {
            sender: "bot",
            text: "안녕하세요! 저는 Flow AI입니다. 오늘 하루는 어떠셨어요?",
        };
        setMessages([initialMessage]);
    }, []);

    const simulateTypingEffect = (messageText, callback) => {
        let index = 0;
        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (index < messageText.length) {
                const currentText = messageText.slice(0, index + 1);
                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = {
                        sender: "bot",
                        text: currentText,
                    };
                    return updatedMessages;
                });
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                callback();
            }
        }, 25);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || isTyping) return;

        const userMessage = { sender: "user", text: userInput };
        setMessages((prev) => [...prev, userMessage]);
        setUserInput("");

        // 서버 요청 시작 → 로딩 애니메이션 활성화
        setIsLoading(true);
        try {
            const botMessageText = await getBotResponse(userInput);

            // 로딩 종료 → 타이핑 시작 전에 isLoading을 false로 설정
            setIsLoading(false);

            // 빈 메시지 추가 후 타이핑 효과 시작
            setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
            simulateTypingEffect(botMessageText, () => {
                scrollToBottom();
            });
        } catch (error) {
            console.error("Error fetching bot response:", error);
            setIsLoading(false); // 에러 발생 시 로딩 종료
        }
    };

    const getBotResponse = async (input) => {
        const defaultResponse = "죄송합니다, 이해하지 못했어요. 다시 질문해주세요!";
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: 'system',
                            content: `
                                너의 이름은 Flow 앱의 AI 비서 "Flow"야.
                                너의 주요 역할은 사용자가 더 나은 하루를 설계하고, 생산성과 행복을 찾아가는 데 도움을 주는 거야.
                                사용자의 목표를 지원하고 일상 속 스트레스 요인을 줄이는 맞춤형 조언을 제공하며,
                                감정 상태와 행동 패턴을 분석해 유익한 피드백과 제안을 제공하는 것이 너의 임무야.

                                대화 방식:
                                1. 사용자가 "오늘 기분이 어때?"라고 물어보면, 감정 상태를 물어보고 이를 바탕으로 맞춤형 활동을 추천해줘.
                                2. 사용자가 하루 목표를 물어보면, 간단한 예시나 긍정적인 코멘트와 함께 대답해.
                                3. 스트레스를 줄이기 위한 방법을 물어보면, 간단하면서 실행 가능한 방법을 제시해.
                                4. 사용자가 성과를 입력하면, 이를 축하하거나 개선할 방법을 친절하게 안내해줘.
                                5. 네 대답은 50자 이내로 간결하고 따뜻하게 해줘.

                                주의:
                                - 답변은 한국어로 작성하고 반말은 절대 사용하지 않아.
                                - 질문의 맥락과 관계없는 대답은 피하고, 항상 사용자 맞춤형으로 답변해.
                                - 질문에 "추천"이 포함되면, 감정/목표/스트레스와 연결된 구체적인 활동을 제시해.
                            `
                        },
                        { role: "user", content: input },
                    ],
                }),
            });
            const data = await response.json();
            return data.choices[0]?.message?.content.trim() || defaultResponse;
        } catch (error) {
            console.error("Error fetching bot response:", error);
            return defaultResponse;
        }
    };

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            {/* 헤더 영역 */}
            <div className={styles.chatHeader}>
                <div className={styles.profileImg}>
                    <img src={logo} alt="Bot" />
                </div>
                Flow AI
            </div>

            {/* 채팅 박스 영역 */}
            <div className={styles.chatInner}>
                <div className={styles.chatBox} ref={chatBoxRef}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${styles.messageWrap} ${
                                message.sender === "user" ? styles.user : styles.bot
                            }`}
                        >
                            {message.sender === "bot" && (
                                <div className={styles.profileImg}>
                                    <img src={logo} alt="Bot" />
                                </div>
                            )}
                            <div className={styles.message}>{message.text}</div>
                        </div>
                    ))}

                    {/* Lottie 애니메이션: 로딩 상태에서만 표시 */}
                    {isLoading && !isTyping && (
                        <div className={styles.messageWrap}>
                            <div className={styles.profileImg}>
                                <img src={logo} alt="Bot" />
                            </div>
                            <div className={styles.loadingIndicator}>
                                <dotlottie-player
                                    src="https://lottie.host/f4c4fd6a-142a-4de2-882a-efe2e8b5b886/qTMQUWjc8j.lottie"
                                    background="transparent"
                                    speed="1.5"
                                    autoplay
                                    loop
                                    style={{
                                        width: "37px",
                                        height: "27px",
                                    }}
                                ></dotlottie-player>
                            </div>
                        </div>
                    )}
                </div>

                {/* 입력 영역 */}
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        className={styles.chatInput}
                        placeholder="메시지를 입력하세요..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isTyping}
                    />
                    <button
                        className={styles.sendButton}
                        onClick={handleSendMessage}
                        disabled={!userInput.trim() || isTyping}
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
