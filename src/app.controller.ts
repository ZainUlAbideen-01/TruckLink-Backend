import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  ping() {
    return { pong: true };
  }

  @Get('boom')
  boom() {
    throw new NotFoundException('nothing here');
  }
}