import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appConfig } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    await app.listen(appConfig().port);
    console.log('app listening on port ' + appConfig().port);
}
bootstrap();
