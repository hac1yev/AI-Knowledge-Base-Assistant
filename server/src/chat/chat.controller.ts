import { Body, Controller, Post } from '@nestjs/common';
import { CreateChatDto } from './dtos/create-chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    handleMessage(@Body() createChatDto: CreateChatDto) {
        return this.chatService.handleMessage(createChatDto.message);
    }
}
