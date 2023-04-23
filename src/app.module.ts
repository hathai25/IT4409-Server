import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ['.env'],
      load: [appConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
