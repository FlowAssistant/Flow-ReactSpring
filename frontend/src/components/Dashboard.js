import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import logo from "../assets/images/flow_black_logo.png";


function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>

            {/* Notice */}
            <div className={styles.notice}>
                📢 Flow 통합 분석 신규 기능 - <strong>“감정 검사”</strong> 기능 활용 안내
            </div>

            {/* Cards Section */}
            <section className={styles.cards}>
                {/* Card 1 */}
                <div className={`${styles.card} ${styles.cardPrimary}`}
                     onClick={() => navigate('/chatbot')}>
                    <div className={styles.cardHeader}>
                        <span className={styles.tag}>NEW</span>
                        <h2 className={styles.cardTitle}>Flow에게 물어보세요</h2>
                    </div>
                    <p className={styles.cardText}>
                        Flow는 당신이 오늘 무슨 일이 있으셨는지 너무 궁금해요 !
                    </p>
                    <img
                        src={logo}
                        alt="chatbot"
                        className={styles.cardImage}
                    />
                </div>

                {/* Card 2 */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>감정 검사 결과, 쉽게 설명해 드릴게요</h2>
                    <p className={styles.cardText}>
                        시각화된 그래프 분석과 함께, 결과에 대해 말씀드릴게요 !
                    </p>
                    <img
                        src="https://placehold.co/80x80"
                        alt="Report explanation"
                        className={styles.cardImage}
                    />
                </div>

                {/* Card 3 */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.greenTag}>적립</span>
                        <h2 className={styles.cardTitle}>감정 관리 팁</h2>
                    </div>
                    <p className={styles.cardText}>
                        Flow가 공유하는 생활 긍정 팁 !
                    </p>
                    <img
                        src="https://placehold.co/80x80"
                        alt="Health management tips"
                        className={styles.cardImage}
                    />
                </div>
            </section>

        </div>
    );
}

export default Dashboard;
