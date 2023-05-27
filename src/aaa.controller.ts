import {
  Controller,
  Get,
  HostParam,
  HttpCode,
  Next,
  Req,
  Res,
  Header,
  Redirect,
  Render,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  hello(@HostParam('host') host) {
    return host;
  }
  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
  }
  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    res.end('ddd');
  }
  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('handler1');
    next();
    return '111';
  }
  @Get('eee')
  eee2() {
    console.log('handle2');
    return 'eee';
  }
  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'hello fff';
  }

  @Get('ggg')
  @Header('aaa', 'bbb')
  ggg() {
    return 'hello ggg';
  }

  @Get('hhh')
  @Redirect('http://google.com')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hhh() {}

  @Get('user')
  @Render('user')
  user() {
    return { name: 'guang', age: 20 };
  }
}
