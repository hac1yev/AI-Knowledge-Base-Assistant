import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useChatMutation } from "./hooks/useChatMutation";

const Chatbot = () => {
  const { mutate, isPending } = useChatMutation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello 👋 How can I help you?",
      sender: "bot",
    },
  ]);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleSend = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const input = formData.get("message") as string;

    if (!input || !input.trim()) return;

    setMessages((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          text: input,
          sender: "user",
        },
      ];
    });

    const file = fileInput.current?.files?.[0] ?? null;

    mutate({
      message: input,
      file,
    }, {
      onSuccess: (response) => {        
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: prev.length + 1,
              text: response.data.content,
              sender: "bot",
            },
          ];
        });
      },
      onError: (error) => {
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: prev.length + 1,
              text: error.message || "An error occurred while sending the message.",
              sender: "bot",
            },
          ];
        });
      }
    });
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Chatbot</h2>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${
                message.sender === "user" ? "user-wrapper" : "bot-wrapper"
              }`}
            >
              <div
                className={`message ${
                  message.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="chatbot-input-container">
          <input type="file" name="fileInput" hidden ref={fileInput} />
          <button
            className="plus-button"
            type="button"
            onClick={() => fileInput.current?.click()}
          >
            <FaPlus />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            name="message"
            className="chatbot-input"
          />

          <button type="submit" className="chatbot-button" disabled={isPending}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
