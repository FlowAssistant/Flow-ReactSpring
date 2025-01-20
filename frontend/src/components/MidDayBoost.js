import React, { useState } from 'react';
import axios from 'axios';

function MidDayBoost({ username }) { // Props로 username 받기
    const [emotion, setEmotion] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleBoost = async () => {
        try {
            const result = await axios.post('/api/midday-boost', {
                username: username,
                emotion: emotion,
            });
            setFeedback(result.data.feedback);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>중간 체크</h2>
            <p>현재 기분을 선택하세요:</p>
            <div>
                <button onClick={() => setEmotion('행복')}>행복</button>
                <button onClick={() => setEmotion('슬픔')}>슬픔</button>
                <button onClick={() => setEmotion('피곤함')}>피곤함</button>
                <button onClick={() => setEmotion('신남')}>신남</button>
                <button onClick={() => setEmotion('중립')}>중립</button>
            </div>
            <button onClick={handleBoost}>중간 체크 시작</button>
            {feedback && (
                <div className="response">
                    <h3>AI 피드백:</h3>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
}

export default MidDayBoost;
