import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { AaaInterceptor } from './aaa.interceptor';
import { Guang } from './guang';
import { AaaController } from './aaa.controller';

@Module({
  imports: [],
  controllers: [AppController, AaaController],
  providers: [
    AppService,
    AaaGuard,
    AaaInterceptor,
    Guang,
    {
      provide: 'Guang',
      useFactory() {
        return {
          name: 'guang',
        };
      },
    },
  ],
})
export class AppModule {}
