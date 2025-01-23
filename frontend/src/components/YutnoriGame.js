import React, { useState } from "react";
import styles from "./YutnoriGame.module.css";

const YutnoriGame = () => {
    // 외곽 경로 정의 (시계 방향 순회)
    const path = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], // 상단
        [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],         // 오른쪽
        [5, 4], [5, 3], [5, 2], [5, 1], [5, 0],         // 하단
        [4, 0], [3, 0], [2, 0], [1, 0],                 // 왼쪽
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 경로 위치
    const [turnMessage, setTurnMessage] = useState(""); // 윷 결과 메시지

    // 윷 던지기 결과 랜덤 생성 (1: 도, 2: 개, 3: 걸, 4: 윷, 5: 모)
    const getRandomThrow = () => {
        const outcomes = [
            { result: "도", steps: 1 },
            { result: "개", steps: 2 },
            { result: "걸", steps: 3 },
            { result: "윷", steps: 4 },
            { result: "모", steps: 5 },
        ];
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    };

    // 윷 던지기 버튼 클릭 핸들러
    const handleThrowYut = () => {
        if (currentIndex >= path.length - 1) {
            setTurnMessage("게임이 끝났습니다! 축하합니다!");
            return;
        }

        const throwResult = getRandomThrow();
        setTurnMessage(`"${throwResult.result}"가 나왔습니다! ${throwResult.steps}칸 이동합니다.`);

        let newIndex = currentIndex + throwResult.steps;

        // 한 바퀴를 돌고 게임 종료
        if (newIndex >= path.length) {
            newIndex = path.length - 1; // 마지막 칸으로 이동
        }

        setCurrentIndex(newIndex); // 새로운 위치로 이동
    };

    // 보드 렌더링
    const renderBoard = () => {
        const board = [];
        for (let row = 0; row < 6; row++) {
            const cells = [];
            for (let col = 0; col < 6; col++) {
                // 현재 위치인지 여부
                const isCurrent = (path[currentIndex][0] === row && path[currentIndex][1] === col);
                const isOuterPath = path.some(([r, c]) => r === row && c === col);

                cells.push(
                    <div
                        key={`${row}-${col}`}
                        className={`
            ${styles.cell} 
            ${isOuterPath ? styles.outerCell : styles.emptyCell} 
            ${isCurrent ? styles.activeCell : ""}
          `}
                    >
                        {isCurrent ? "●" : ""}
                    </div>
                );
            }
            board.push(
                <div key={row} className={styles.row}>
                    {cells}
                </div>
            );
        }
        return board;
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>윷놀이 게임</h1>
            <div className={styles.board}>{renderBoard()}</div>
            <button onClick={handleThrowYut} className={styles.button}>
                윷 던지기
            </button>
            <p className={styles.message}>{turnMessage}</p>
        </div>
    );
};

export default YutnoriGame;
