import React, { useState } from 'react';
import axios from 'axios';
import './MorningCheckIn.css'; // CSS 파일 추가

function MorningCheckIn() {
    const [response, setResponse] = useState('');
    const [logs, setLogs] = useState([]); // 테스트 로그 저장

    const handleCheckIn = async (emotion) => {
        try {
            const result = await axios.post('/api/morning-checkin', {
                username: 'testUser', // 테스트 사용자
                emotion: emotion,
            });
            setResponse(result.data.recommendedActivity);
            setLogs((prevLogs) => [...prevLogs, { emotion, activity: result.data.recommendedActivity }]); // 로그 추가
        } catch (error) {
            console.error(error);
            setResponse('오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>아침 체크인</h2>
            <p>오늘의 기분을 선택하세요:</p>
            <div>
                <button onClick={() => handleCheckIn('행복')}>행복</button>
                <button onClick={() => handleCheckIn('슬픔')}>슬픔</button>
                <button onClick={() => handleCheckIn('피곤함')}>피곤함</button>
                <button onClick={() => handleCheckIn('신남')}>신남</button>
                <button onClick={() => handleCheckIn('중립')}>중립</button>
            </div>
            <div className="response">
                {response && (
                    <>
                        <h3>추천 활동</h3>
                        <p>{response}</p>
                    </>
                )}
            </div>
            <div className="logs">
                <h3>테스트 로그</h3>
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>
                            기분: {log.emotion} - 추천 활동: {log.activity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MorningCheckIn;
