import { useEffect, useState } from "react";
import type { Message } from "@/types/message";
import "./messageBoard.scss";

export default function MessageBoard() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  useEffect(() => {
    let intervalId: number | undefined = undefined;
    function getMessage() {
      intervalId = setInterval(async () => {
        const res = await fetch(
          "https://official-joke-api.appspot.com/jokes/random",
        );
        const message: Message = await res.json();
        setMessageList((prev) => [...prev, message]);
      }, 10000);
    }
    getMessage();
    return () => clearInterval(intervalId);
  });

  const sendMessageHandler = () => {
    const newMessage = {
      id: crypto.randomUUID(),
      type: "user",
      setup: userMessage,
      punchline: "",
    };
    setMessageList((pre) => [...pre, newMessage]);
  };

  return (
    <div className="message-board-container">
      <h1>My Message Board</h1>
      <ul>
        {messageList.map((message) => (
          <li
            key={message.id}
            className={
              message.type === "user"
                ? "message-container user-message"
                : "message-container regular-message"
            }
          >
            <div className="message">{message.setup}</div>
          </li>
        ))}
      </ul>
      <div>
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}
