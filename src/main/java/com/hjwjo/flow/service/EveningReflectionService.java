package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.EveningReflection;
import com.hjwjo.flow.repository.EveningReflectionRepository;
import com.hjwjo.flow.repository.MorningCheckInRepository;
import org.springframework.stereotype.Service;

@Service
public class EveningReflectionService {

    private final EveningReflectionRepository repository;

    public EveningReflectionService(EveningReflectionRepository repository) {
        this.repository = repository;
    }

    public String generateFeedback(String username, String reflection) {
        // 피드백 생성
        String feedback;
        if (reflection.contains("스트레스")) {
            feedback = "오늘 스트레스를 받으셨군요. 내일은 더 여유로운 하루를 만들어 보세요.";
        } else if (reflection.contains("기쁨")) {
            feedback = "오늘 좋은 일이 있으셨네요! 내일도 이런 긍정적인 에너지를 유지해보세요.";
        } else {
            feedback = "오늘 하루를 잘 마무리하셨네요. 내일도 좋은 하루가 되길 바랍니다.";
        }

        //더미데이터 >> OpenAI + TensorFlow 예정

        // 데이터 저장
        EveningReflection reflectionEntity = new EveningReflection();
        reflectionEntity.setUsername(username);
        reflectionEntity.setReflection(reflection);
        reflectionEntity.setFeedback(feedback);
        repository.save(reflectionEntity);

        return feedback;
    }

}
