import React, { useState, useEffect } from "react";
import styles from "./HappinessTracker.module.css";

const HappinessTracker = ({ username }) => {
    const [goals, setGoals] = useState([]); // 사용자 목표
    const [completedGoals, setCompletedGoals] = useState([]); // 완료된 목표
    const [newGoal, setNewGoal] = useState(""); // 새 목표 입력
    const [weeklyProgress, setWeeklyProgress] = useState(0); // 주간 진행률

    useEffect(() => {

        const fetchGoals = async () => {

            const mockData = {
                goals: ["산책 30분", "좋아하는 책 읽기", "스쿼트 20분"],
                completed: ["산책 30분"],
            };
            setGoals(mockData.goals);
            setCompletedGoals(mockData.completed);
        };
        fetchGoals();
    }, []);

    // 목표 추가
    const addGoal = () => {
        if (newGoal.trim()) {
            setGoals((prev) => [...prev, newGoal.trim()]);
            setNewGoal("");
        }
    };

    // 목표 완료
    const toggleGoalCompletion = (goal) => {
        if (completedGoals.includes(goal)) {
            setCompletedGoals((prev) => prev.filter((g) => g !== goal));
        } else {
            setCompletedGoals((prev) => [...prev, goal]);
        }
    };

    // 주간 진행 업데이트
    useEffect(() => {
        setWeeklyProgress(
            goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0
        );
    }, [goals, completedGoals]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>ToDoList</h2>

            <div className={styles.goalInput}>
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="새 목표를 입력하세요"
                    className={styles.input}
                />
                <button onClick={addGoal} className={styles.addButton}>
                    추가
                </button>
            </div>

            <ul className={styles.goalList}>
                {goals.map((goal, index) => (
                    <li
                        key={index}
                        className={`${styles.goalItem} ${
                            completedGoals.includes(goal) ? styles.completed : ""
                        }`}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={completedGoals.includes(goal)}
                                onChange={() => toggleGoalCompletion(goal)}
                            />
                            {goal}
                        </label>
                    </li>
                ))}
            </ul>

            <div className={styles.progressSection}>
                <h3>주간 목표 진행률</h3>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${weeklyProgress}%` }}
                    ></div>
                </div>
                <p>{weeklyProgress}%</p>
            </div>

            <div className={styles.stampSection}>
                <h3>이번 주 도장</h3>
            <div className={styles.stampContainer}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.stamp} ${
                                i < Math.floor((weeklyProgress / 100) * 7) ? styles.filled : ""
                            }`}
                        >
                            {i < Math.floor((weeklyProgress / 100) * 7) ? "✔" : ""}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HappinessTracker;
