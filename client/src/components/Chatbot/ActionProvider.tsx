import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

interface ActionProviderProps {
  setState: (state: any) => void;
  children: React.ReactNode;
}

const ActionProvider = ({ setState, children }: ActionProviderProps) => {
  const handleMessage = (botMessage: string) => {
    const message = createChatBotMessage(botMessage, {});

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
          return React.cloneElement(child, {
            actions: {
              handleMessage,
            },
          } as any);
      })}
    </div>
  );
};

export default ActionProvider;
