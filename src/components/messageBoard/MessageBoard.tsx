import { useEffect, useState } from "react";
import type { Message } from "@/types/message";
import "./messageBoard.scss";

export default function MessageBoard() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(
          "https://official-joke-api.appspot.com/jokes/random",
        );
        const message: Message = await res.json();
        setMessageList((prev) => [...prev, message]);
      } catch (error) {
        console.log(error);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      id: crypto.randomUUID(),
      type: "user",
      setup: userMessage,
      punchline: "",
    };
    setMessageList((pre) => [...pre, newMessage]);
    setUserMessage("");
  };

  return (
    <div className="message-board-container">
      <h1>My Message Board</h1>
      <ul>
        {messageList.map((message) => (
          <li
            key={message.id}
            className={`message-container ${message.type === "user" ? "user-message" : "regular-message"}`}
          >
            <div className="message">{message.setup}</div>
          </li>
        ))}
      </ul>
      <div>
        <form onSubmit={sendMessageHandler}>
          <input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
