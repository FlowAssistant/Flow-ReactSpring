import React, { useState } from 'react';
import axios from 'axios';
import './EveningReflection.css'; // CSS 파일 import

function EveningReflection() {
    const [reflection, setReflection] = useState('');
    const [response, setResponse] = useState(null);

    const handleReflection = async () => {
        try {
            const result = await axios.post('/api/evening-reflection', {
                username: 'testUser', // 임시 사용자
                reflection: reflection,
            });
            setResponse(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>저녁 회고</h2>
            <div>
                <label>오늘 하루를 돌아보며 한 마디로 표현해 보세요:</label>
                <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="예: 오늘은 스트레스가 많았지만 뿌듯한 하루였어요."
                />
            </div>
            <button onClick={handleReflection}>피드백 받기</button>
            {response && (
                <div className="response">
                    <h3>피드백:</h3>
                    <p>{response.feedback}</p>
                </div>
            )}
        </div>
    );
}

export default EveningReflection;
