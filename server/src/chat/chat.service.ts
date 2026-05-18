import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import {
  SystemMessage,
  HumanMessage,
  BaseMessage,
} from '@langchain/core/messages';
import { extractFileContent } from 'utils/extractFileContent';
import { ISendMessageType } from './types/chat.types';

@Injectable()
export class ChatService {
  private chatModel: ChatOpenAI;

  private conversationHistory: BaseMessage[] = [
    new SystemMessage(
      'You are a helpful assistant that provides information about the knowledge base.',
    ),
  ];

  constructor() {
    this.chatModel = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0.7,
    });
  }

  async sendMessage({ content, file}: ISendMessageType) {
    let fileContent = '';

    if (file) {
      fileContent = await extractFileContent(file);
    }

    const finalPrompt = `
      User message: ${content}
      File content: ${fileContent}
    `;
    
    this.conversationHistory.push(new HumanMessage(finalPrompt));

    const response = await this.chatModel.invoke(this.conversationHistory);

    this.conversationHistory.push(response);

    return { content: response.content };
  }
}
