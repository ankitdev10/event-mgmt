import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/configuration';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService<AppConfig, true>);
    const apiOptions = config.get('apiOptions', { infer: true });
    await app.listen(apiOptions.port, apiOptions.host).then(() => {
      console.log(
        `Application is running on: http://${apiOptions.host}:${apiOptions.port}`,
      );
      console.log(
        `Playground: http://${apiOptions.host}:${apiOptions.port}/graphql`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
