import { Module } from '@nestjs/common';
import { TestService } from './test.service';

const services = [TestService];
@Module({
  imports: [],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}
