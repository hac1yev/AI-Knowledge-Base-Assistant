import { Chatbot } from "react-chatbot-kit";
import chatBotConfig from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatBotComponent = () => {
  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
      <Chatbot
        config={chatBotConfig}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatBotComponent;
