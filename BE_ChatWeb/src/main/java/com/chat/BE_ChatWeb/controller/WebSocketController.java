package com.chat.BE_ChatWeb.controller;

import com.chat.BE_ChatWeb.dto.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

//    @MessageMapping("/chat") // Đường dẫn nhận tin nhắn từ client
//    @SendTo("/topic/messages") // Đường dẫn gửi tin nhắn tới client
//    public String sendMessage(String message) {
//        return message; // Trả về tin nhắn đã nhận
//    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(Message message) {
        System.out.println(message.getContent());
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}

