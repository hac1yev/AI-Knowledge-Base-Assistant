import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChatMessageDto } from './dtos/chatMessage.dto';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async sendMessage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ChatMessageDto,
  ) {
    return this.chatService.sendMessage({
      content: body.message,
      file,
    });
  }
}
