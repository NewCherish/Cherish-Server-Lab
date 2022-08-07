import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  // @Post()
  // createCat(): string {
  //   return 'create cat';
  // }

  // @Post()
  // async createcat(@Body() createCatDto: CreateCatDto) {
  //   return 'create cat by using CreateCatDto';
  // }

  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }

  @Put()
  @HttpCode(204)
  modifyCat(): string {
    return 'modify cat';
  }

  // @Get()
  // findAll(@Req() req: Request): string {
  //   return 'return all cats';
  // }

  // @Get()
  // async findAll(): Promise<any[]> {
  //   return [];
  // }

  @Get(':id')
  findCatById(@Param('id') id: string): string {
    console.log(id);
    return `return cat's id : ${id}`;
  }
}
