import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import send from "../../assets/images/send-icon.png";
import "../../declarations.d.ts";

const mockOpenAICall = async (
  message: string,
  addTask: (taskText: string) => void
) => {
  await new Promise((resolve) => setTimeout(resolve, 1300));
  if (
    message.toLowerCase().includes("add task") ||
    message.toLowerCase().includes("new task")
  ) {
    const taskText = message.replace(/add task|new task/i, "").trim();
    addTask(taskText);
    return `Got it! Added "${taskText}" to your to-do list.`;
  }
  return `Hi! What should we do today? Use "add task" or "new task" to add a task below.`;
};

type Message = {
  text: string;
  isUser: boolean;
  timestamp: string;
};

export default function Chat({ addTask }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Retrieve chat history from local storage
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await mockOpenAICall(input, addTask);
      const aiMessage: Message = {
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      // Store updated messages in local storage
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([...messages, userMessage, aiMessage])
      );
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "Sorry, there was an error processing your request.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handledClearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="chatSection">
      <h2 className="sectionTitle">Let's Chat!</h2>

      <div className="chatBox" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatMessage ${
              message.isUser ? "userMessage" : "aiMessage"
            }`}
          >
            <div>{message.text}</div>
            {message.isUser ? (
              <div className="timestamp userTimestamp">{message.timestamp}</div>
            ) : (
              <div className="timestamp aiTimestamp">{message.timestamp}</div>
            )}
          </div>
        ))}
      </div>

      <button className="resetButton" onClick={() => handledClearChat()}>
        Clear Chat
      </button>
      <form onSubmit={handleSubmit} className="chatForm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chatInput"
          disabled={isLoading}
        />

        <button type="submit" className="chatSubmit" disabled={isLoading}>
          {isLoading ? (
            "Sending..."
          ) : (
            <img className="sendIcon" src={send} alt="send icon" />
          )}
        </button>
      </form>
    </section>
  );
}
