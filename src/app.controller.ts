import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Optional,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  // UsePipes,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  Options,
  Head,
  SetMetadata,
  Headers,
  Ip,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { AaaInterceptor } from './aaa.interceptor';
import { AaaDto } from './aaa.dto';

@Controller()
@SetMetadata('roles', ['user'])
export class AppController {
  // constructor(private readonly appService: AppService) {}
  @Inject(AppService)
  private readonly appService: AppService;

  @Optional()
  @Inject('Guang')
  private readonly guang: Record<string, any>;

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @UseInterceptors(AaaInterceptor)
  @SetMetadata('roles', ['user'])
  // @UsePipes(ParseIntPipe)
  getHello(): string {
    console.log(this.guang);
    throw new HttpException('xxxx', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Get('/xxx/:aaa')
  getHello2(
    @Param('aaa', ParseIntPipe) aaa: number,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
  ) {
    console.log(typeof aaa, typeof bbb);
    console.log(aaa, bbb);
    return 'hello2';
  }

  @Post('/bbb')
  getHello3(@Body() aaa: AaaDto) {
    console.log(aaa);
    return 'hello3';
  }

  @Put()
  getHello4() {
    return 'hello4';
  }
  @Delete()
  getHello5() {
    return 'hello5';
  }
  @Patch()
  getHello6() {
    return 'hello6';
  }
  @Options()
  getHello7() {
    return 'hello7';
  }
  @Head()
  getHello8() {
    return 'hello8';
  }
  @Get('/ccc')
  header(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    console.log(accept, headers);
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
  }

  @Get('/session')
  session(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }
}
