import React, { useState } from 'react';
import axios from 'axios';

function MorningCheckIn() {
    const [emotion, setEmotion] = useState('');
    const [response, setResponse] = useState(null);

    const handleCheckIn = async () => {
        try {
            const result = await axios.post('/api/morning-checkin', {
                username: 'testUser', // 임시 사용자
                emotion: emotion,
            });
            setResponse(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>아침 체크인</h2>
            <div>
                <label>오늘 기분이 어떠신가요?</label>
                <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                    <option value="">기분을 선택해주세요</option>
                    <option value="Happy">기쁨</option>
                    <option value="Sad">슬픔</option>
                    <option value="Tired">피곤</option>
                    <option value="Excited">설렘</option>
                    <option value="Neutral">평온</option>
                </select>
            </div>
            <button onClick={handleCheckIn}>체크인 하기</button>
            {response && (
                <div>
                    <h3>추천 활동:</h3>
                    <p>{response.recommendedActivity}</p>
                </div>
            )}
        </div>
    );
}

export default MorningCheckIn;
