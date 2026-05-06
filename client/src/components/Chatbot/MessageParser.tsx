import React from 'react';

const MessageParser = ({ children, actions }: { children: React.ReactNode; actions: any }) => {

  const parse = async (message: string) => {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    
    const data = await response.text(); 
    
    actions.handleMessage(data);
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            parse: parse,
            actions: {},
          } as any);
        }
        return child;
      })}
    </div>
  );
};

export default MessageParser;