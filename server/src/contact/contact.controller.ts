import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './contact.dto';

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() contactDto: ContactDto) {
    this.logger.log(`Received contact request from: ${contactDto.email}`);
    const result = await this.contactService.sendContactEmail(contactDto);
    return {
      status: 'ok',
      message: result.message,
    };
  }
}
