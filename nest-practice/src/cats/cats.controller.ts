import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  createCat(): string {
    return 'create cat';
  }

  @Get()
  findAll(@Req() req: Request): string {
    return 'return all cats';
  }
}
