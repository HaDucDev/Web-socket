import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    // Kết nối tới Websocket server
    const socket = new SockJS('http://localhost:8080/websocket');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      // Lưu trữ đối tượng stompClient trong state
      setStompClient(client);

      // Đăng ký để nhận tin nhắn từ server
      client.subscribe('/topic/messages', (response) => {
        let message =JSON.parse(response.body);
        setReceivedMessage(message.content);
      });
    });

    return () => {
      // Đóng kết nối trước khi component bị hủy
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra nếu kết nối Websocket đã được thiết lập
    if (stompClient && stompClient.connected) {
      // Gửi tin nhắn tới server
      stompClient.send('/app/chat', {}, JSON.stringify({ content: message }));
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Real-time Chat</h2>
      <div>{receivedMessage}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
