import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  createCat(): string {
    return 'create cat';
  }

  @Put()
  @HttpCode(204)
  modifyCat(): string {
    return 'modify cat';
  }

  @Get()
  findAll(@Req() req: Request): string {
    return 'return all cats';
  }

  @Get(':id')
  findCatById(@Param('id') id: string): string {
    console.log(id);
    return `return cat's id : ${id}`;
  }
}
