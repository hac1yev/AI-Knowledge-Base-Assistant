import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class ChatService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are a helpful chatbot',
    },
  ];

  async handleMessage(userMessage: string) {
    console.log(userMessage);

    this.messages.push({
      role: 'user',
      content: userMessage,
    });

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: this.messages,
    });

    const assistantReply = response.choices[0].message.content;

    this.messages.push({
      role: 'assistant',
      content: assistantReply,
    });

    return assistantReply;
  }
}