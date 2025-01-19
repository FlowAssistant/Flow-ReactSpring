package com.hjwjo.flow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/{path:[^\\.]*}") // 정적 파일이 아닌 모든 요청을 index.html로 포워드
    public String redirectToIndex() {
        return "forward:/index.html"; // React가 라우팅 처리
    }
}
